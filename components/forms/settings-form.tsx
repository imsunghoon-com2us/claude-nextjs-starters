"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useLocalStorage } from "usehooks-ts"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { profileSchema, type ProfileValues } from "@/lib/validations/auth"

export function SettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "홍길동", email: "user@example.com" },
  })

  // 환경설정은 localStorage에 유지 (SSR 하이드레이션 불일치 방지)
  const [notifications, setNotifications] = useLocalStorage("pref-notifications", true, {
    initializeWithValue: false,
  })

  // 샘플: 실제 연동 시 try/catch + setError("root")로 실패 처리
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500))
    toast.success("프로필이 저장되었습니다 (샘플)")
  }

  return (
    <Tabs defaultValue="profile" className="max-w-xl">
      <TabsList>
        <TabsTrigger value="profile">프로필</TabsTrigger>
        <TabsTrigger value="preferences">환경설정</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="pt-4">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">이름</FieldLabel>
              <Input id="name" aria-invalid={!!errors.name} {...register("name")} />
              <FieldError errors={[errors.name]} />
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">이메일</FieldLabel>
              <Input id="email" type="email" aria-invalid={!!errors.email} {...register("email")} />
              <FieldError errors={[errors.email]} />
            </Field>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <LoadingSpinner />}
                저장
              </Button>
              <ConfirmDialog
                trigger={<Button type="button" variant="destructive" />}
                triggerLabel="계정 삭제"
                title="계정을 삭제할까요?"
                description="이 작업은 되돌릴 수 없습니다. (샘플 동작)"
                confirmLabel="삭제"
                onConfirm={() => toast.error("계정 삭제는 샘플이라 동작하지 않습니다.")}
              />
            </div>
          </FieldGroup>
        </form>
      </TabsContent>

      <TabsContent value="preferences" className="pt-4">
        <Field orientation="horizontal">
          <div className="flex-1">
            <FieldLabel htmlFor="notifications">알림 받기</FieldLabel>
            <FieldDescription>브라우저에 저장되는 환경설정입니다.</FieldDescription>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </Field>
      </TabsContent>
    </Tabs>
  )
}
