#!/usr/bin/env bash
# Claude Code 상태줄: 모델 | 사고 깊이 | 컨텍스트 | 5시간/7일 한도 (한 줄)
# stdin으로 들어온 JSON을 jq로 파싱하며, 값이 없는 항목은 생략한다.

input=$(cat)

# jq 헬퍼: 값이 없으면 빈 문자열 반환
get() { echo "$input" | jq -r "$1 // empty" 2>/dev/null; }

# 남은 시간 포맷 (epoch 초 -> "2시간 5분" / "3일 4시간")
fmt_reset() {
  local diff=$(( $1 - $(date +%s) ))
  [ "$diff" -le 0 ] && { echo "곧"; return; }
  local d=$(( diff / 86400 )) h=$(( diff % 86400 / 3600 )) m=$(( diff % 3600 / 60 ))
  if [ "$d" -gt 0 ]; then echo "${d}일 ${h}시간"
  elif [ "$h" -gt 0 ]; then echo "${h}시간 ${m}분"
  else echo "${m}분"; fi
}

# 진행 바 (10칸)
bar() {
  local pct=$1 filled i out=""
  filled=$(( (pct * 10 + 50) / 100 ))
  [ "$filled" -gt 10 ] && filled=10
  for ((i = 0; i < 10; i++)); do
    if [ "$i" -lt "$filled" ]; then out+="█"; else out+="░"; fi
  done
  echo "$out"
}

parts=()

# 1. 모델
model=$(get '.model.display_name')
[ -n "$model" ] && parts+=("모델: $model")

# 2. 사고 깊이 (effort.level 우선, 없으면 thinking.enabled)
effort=$(get '.effort.level')
thinking=$(echo "$input" | jq -r 'if .thinking.enabled == true then "on" elif .thinking.enabled == false then "off" else empty end' 2>/dev/null)
if [ -n "$effort" ]; then
  parts+=("사고: $effort")
elif [ "$thinking" = "on" ]; then
  parts+=("사고: 켜짐")
elif [ "$thinking" = "off" ]; then
  parts+=("사고: 꺼짐")
fi

# 3. 컨텍스트 사용량
used=$(get '.context_window.used_percentage')
if [ -n "$used" ]; then
  p=$(printf '%.0f' "$used")
  parts+=("컨텍스트: $(bar "$p") ${p}%")
fi

# 4. 한도 남은 비율 + 리셋 시간
for key in five_hour seven_day; do
  [ "$key" = five_hour ] && label="5시간" || label="7일"
  pct=$(get ".rate_limits.$key.used_percentage")
  [ -z "$pct" ] && continue
  remain=$(printf '%.0f' "$(echo "100 - $pct" | bc -l)")
  [ "$remain" -lt 0 ] && remain=0
  seg="${label} 남음 ${remain}%"
  reset=$(get ".rate_limits.$key.resets_at")
  [ -n "$reset" ] && seg+=" (리셋 $(fmt_reset "${reset%.*}"))"
  parts+=("$seg")
done

# 구분자로 합쳐 한 줄 출력
out=""
for p in "${parts[@]}"; do
  [ -n "$out" ] && out+=" | "
  out+="$p"
done
printf '%s\n' "$out"
