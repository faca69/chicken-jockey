"use server"

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";


export async function signUpFnction(formData:FormData){

    const name = formData.get("name") as string
    if(!name) return {error:"Name is required"}

    const email = formData.get("email") as string;
    if(!email) return {error:"Email is required"}

    const password = formData.get("password") as string;
    if(!password) return {error:"Password is required"} 


    try {

        await auth.api.signUpEmail({
            body:{
                email,
                password,
                name,
                role: "USER"
            }
        })
        return {error:null}
        
    } catch (err) {
        if (err instanceof APIError) {
            const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN"

            switch(errCode){

                case "USER_ALREADY_EXISTS":
                    return {error:"User already exists"}
                default:
                    return {error:err.message}
            }
        }
        return {error:"Internal server error"}
    }

}
