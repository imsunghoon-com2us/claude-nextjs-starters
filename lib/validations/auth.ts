import { z } from "zod"

const nameField = z.string().trim().min(2, "이름은 2자 이상이어야 합니다.")
const emailField = z.email("올바른 이메일을 입력해주세요.")

export const loginSchema = z.object({
  email: emailField,
  // 로그인은 비밀번호 정책(8자 이상)을 노출하지 않고 입력 여부만 확인
  password: z.string().min(1, "비밀번호를 입력해주세요."),
})

export const signupSchema = z
  .object({
    name: nameField,
    email: emailField,
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  })

export const profileSchema = z.object({
  name: nameField,
  email: emailField,
})

export type LoginValues = z.infer<typeof loginSchema>
export type SignupValues = z.infer<typeof signupSchema>
export type ProfileValues = z.infer<typeof profileSchema>
