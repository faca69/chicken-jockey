"use client"

import { toast } from "sonner";
import { useState } from "react";
import { signUpFnction } from "@/actions/sign-up.action";
import { useRouter } from "next/navigation";


const SignUpForm = () => {

const [isPending,setIsPending] = useState(false)
const router = useRouter()

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.target as HTMLFormElement)

        const {error} = await signUpFnction(formData)

        if(error) {
            toast.error(error)
            setIsPending(false)
        } else {
            toast.success("Signed up successfully please verify your email")
            router.push("/auth/sign-up/success")
        }

        setIsPending(false)
    }
  return <div>
    
    <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" disabled={isPending}>{isPending ? "Signing Up..." : "Sign Up"}</button>
    </form>

  </div>
}
  

export default SignUpForm   