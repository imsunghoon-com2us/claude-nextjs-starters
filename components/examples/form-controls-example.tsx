"use client"

import { useState } from "react"

import { ExampleSection } from "@/components/examples/example-section"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function FormControlsExample() {
  const [plan, setPlan] = useState("free")

  return (
    <ExampleSection id="forms" title="폼 컨트롤" description="Field로 감싼 Input, Textarea, Select, Checkbox, Switch, RadioGroup">
      <FieldGroup className="max-w-md">
        <Field>
          <FieldLabel htmlFor="ex-input">이름</FieldLabel>
          <Input id="ex-input" placeholder="홍길동" />
          <FieldDescription>FieldDescription으로 보조 설명을 표시합니다.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="ex-textarea">소개</FieldLabel>
          <Textarea id="ex-textarea" placeholder="자기소개를 입력하세요" />
        </Field>
        <Field>
          <FieldLabel>요금제</FieldLabel>
          <Select value={plan} onValueChange={(v) => v && setPlan(v)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="ex-terms" />
          <FieldLabel htmlFor="ex-terms">약관에 동의합니다</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="ex-switch">마케팅 수신</FieldLabel>
          <Switch id="ex-switch" />
        </Field>
        <Field>
          <FieldLabel>연락 방법</FieldLabel>
          <RadioGroup defaultValue="email">
            <Field orientation="horizontal">
              <RadioGroupItem value="email" id="ex-r1" />
              <FieldLabel htmlFor="ex-r1">이메일</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="sms" id="ex-r2" />
              <FieldLabel htmlFor="ex-r2">문자</FieldLabel>
            </Field>
          </RadioGroup>
        </Field>
      </FieldGroup>
    </ExampleSection>
  )
}
