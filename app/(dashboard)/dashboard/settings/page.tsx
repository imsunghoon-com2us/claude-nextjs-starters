import type { Metadata } from "next"

import { PageHeader } from "@/components/common/page-header"
import { SettingsForm } from "@/components/forms/settings-form"

export const metadata: Metadata = { title: "설정" }

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="설정" description="프로필과 환경설정을 관리하세요." />
      <SettingsForm />
    </>
  )
}
