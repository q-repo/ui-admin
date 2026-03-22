import dynamic from "next/dynamic"

const SignInForm = dynamic(() => import("@/components/auth/SignInForm"), {
  ssr: true,
});

export default function Login() {
  return (
    <SignInForm />
  )
}