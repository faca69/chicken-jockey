"use client"

import { signOut } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { toast } from "sonner"



function SignOutButton() {

    const handleSignOut = async () => {

    await signOut({
        fetchOptions:{
            onError(context) {
                toast.error(context.error.message)
            },
            onSuccess() {
                toast.success("Signed out successfully")
                redirect("/auth/sign-in")
            },
            
        }
    })

    }

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  )
}

export default SignOutButton