#!/bin/bash
# Claude Code 알림 훅
# - Notification(permission_prompt): 권한 승인 대기 알림
# - Stop: 작업 완료 알림
# 슬랙 Incoming Webhook + macOS 기본 알림으로 전송한다.
#
# 슬랙 웹훅 URL은 비밀값이라 저장소에 포함하지 않는다.
# 슬랙 알림을 받으려면 ~/.claude/hooks/notify.env (권한 600)에 아래 값을 직접 설정한다.
#   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
#   NOTIFY_SLACK=1          # 0이면 슬랙 전송 안 함
#   NOTIFY_MAC=1            # 0이면 macOS 알림 안 함
#   NOTIFY_MIN_SECONDS=60   # 이보다 짧은 작업은 완료 알림 생략
# 파일이 없으면 macOS 알림만 전송한다. (의존성: jq)

INPUT=$(cat)

# 설정 로드 (SLACK_WEBHOOK_URL, NOTIFY_SLACK, NOTIFY_MAC)
CONFIG_FILE="$HOME/.claude/hooks/notify.env"
[ -r "$CONFIG_FILE" ] && . "$CONFIG_FILE"
NOTIFY_SLACK="${NOTIFY_SLACK:-1}"
NOTIFY_MAC="${NOTIFY_MAC:-1}"

# 훅 입력 JSON에서 값 추출
field() { jq -r "$1" <<<"$INPUT" 2>/dev/null; }

EVENT=$(field '.hook_event_name // empty')
CWD=$(field '.cwd // empty')
PROJECT=$(basename "${CWD:-$PWD}")

# 작업 시작 시각 기록용 상태 디렉터리 (세션별 파일)
NOTIFY_MIN_SECONDS="${NOTIFY_MIN_SECONDS:-60}"
STATE_DIR="$HOME/.claude/hooks/.state"
SESSION_ID=$(field '.session_id // empty' | tr -cd 'A-Za-z0-9_-')

case "$EVENT" in
  UserPromptSubmit)
    # 프롬프트 제출 시각을 저장하고 종료 (오래된 상태 파일은 정리)
    if [ -n "$SESSION_ID" ]; then
      mkdir -p "$STATE_DIR" && date +%s > "$STATE_DIR/$SESSION_ID"
      find "$STATE_DIR" -type f -mtime +7 -delete 2>/dev/null
    fi
    exit 0
    ;;
  Notification)
    TITLE="🔐 Claude Code 권한 요청"
    BODY=$(field '.message // "권한 승인이 필요합니다."')
    SOUND="Glass"
    ;;
  Stop)
    # 작업 시간이 기준(NOTIFY_MIN_SECONDS)보다 짧으면 알림을 보내지 않는다 (시작 기록이 없으면 보냄)
    START=$(cat "$STATE_DIR/$SESSION_ID" 2>/dev/null)
    if [[ "$START" =~ ^[0-9]+$ ]] && [ $(( $(date +%s) - START )) -lt "$NOTIFY_MIN_SECONDS" ]; then
      exit 0
    fi
    TITLE="✅ Claude Code 작업 완료"
    # 마지막 응답에서 마크다운 기호를 제거하고 한 줄로 압축해 150자까지만 사용
    BODY=$(field '(.last_assistant_message // "작업이 완료되었습니다.")
      | gsub("\\[(?<t>[^\\]]*)\\]\\([^)]*\\)"; .t)
      | gsub("\\*\\*|`|~~"; "")
      | gsub("(?<n>^|\\n)[ \\t]*(#+|[-*>])[ \\t]+"; .n)
      | gsub("\\s+"; " ")
      | if length > 150 then .[0:150] + "…" else . end')
    # 아직 진행 중인 백그라운드 작업이 있으면 표시
    BG=$(field '(.background_tasks // []) | length')
    [ "${BG:-0}" -gt 0 ] && BODY="$BODY (백그라운드 작업 ${BG}개 진행 중)"
    SOUND="Hero"
    ;;
  *)
    exit 0
    ;;
esac

# macOS 기본 알림: 문자열을 인자로 넘겨 따옴표/특수문자 주입을 방지하고, 잘라내기는 jq로(멀티바이트 안전)
if [ "$NOTIFY_MAC" = "1" ]; then
  MAC_BODY=$(jq -rn --arg b "$BODY" '$b | .[0:150]')
  osascript - "$TITLE" "$PROJECT" "$MAC_BODY" "$SOUND" >/dev/null 2>&1 <<'APPLESCRIPT'
on run argv
  display notification (item 3 of argv) with title (item 1 of argv) subtitle (item 2 of argv) sound name (item 4 of argv)
end run
APPLESCRIPT
fi

# 슬랙 웹훅: jq로 JSON을 만들고, mrkdwn 특수문자(& < >)는 이스케이프한다
if [ "$NOTIFY_SLACK" = "1" ] && [ -n "${SLACK_WEBHOOK_URL:-}" ]; then
  PAYLOAD=$(jq -n \
    --arg title "$TITLE" --arg body "$BODY" --arg project "$PROJECT" \
    --arg cwd "$CWD" --arg host "$(hostname -s)" --arg time "$(date '+%m-%d %H:%M')" '
    def esc: gsub("&"; "&amp;") | gsub("<"; "&lt;") | gsub(">"; "&gt;");
    {
      text: "\($title) [\($project)] \($body | .[0:100] | esc)",
      blocks: [
        {type: "header", text: {type: "plain_text", text: $title}},
        {type: "section", text: {type: "mrkdwn", text: ($body | esc)}},
        {type: "context", elements: [{type: "mrkdwn",
          text: "📁 `\($cwd | esc)` · 💻 \($host) · 🕒 \($time)"}]}
      ]
    }')
  curl -sS -m 5 -X POST -H 'Content-Type: application/json' \
    --data "$PAYLOAD" "$SLACK_WEBHOOK_URL" >/dev/null 2>&1
fi

exit 0
