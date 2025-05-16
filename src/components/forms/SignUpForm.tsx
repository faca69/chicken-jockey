"use client"

import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";




const SignUpForm = () => {


    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get("name") as string
        if(!name) return toast.error("Name is required");
    
        const email = formData.get("email") as string;
        if(!email) return toast.error("Email is required");
    
        const password = formData.get("password") as string;
        if(!password) return toast.error("Password is required");   

        await signUp.email({
            email,
            password,
            name,
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
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
    </form>

  </div>
}
  

export default SignUpForm   