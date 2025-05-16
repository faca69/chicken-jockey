"use client"

import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";




const SignInForm = () => {


    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get("email") as string;
        if(!email) return toast.error("Email is required");
    
        const password = formData.get("password") as string;
        if(!password) return toast.error("Password is required");   

        await signIn.email({
            email,
            password,
        },{

            onRequest(context) {
                console.log(context)
            },
            onResponse(response) {
                console.log(response)
            },
            onSuccess(data) {
                console.log(data)
            },
            onError(context) {
                toast.error(context.error.message)
            },


        })
    }

  return <div>
    
    <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
    </form>

  </div>
}
  

export default SignInForm   