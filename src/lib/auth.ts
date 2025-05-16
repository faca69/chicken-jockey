import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import { APIError } from "better-auth/api";
import { VALID_DOMAINS } from "./utils";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  advanced:{
    database:{
      generateId:false
    }
    
  },
  user:{
    additionalFields:{
      role: {
        type: ["COMPANY", "USER"],
      },
    },
  },
  hooks:{
    before: createAuthMiddleware(async (ctx)=> {

      if(ctx.path === "/sign-up/email") {
        const email = ctx.body.email as string
        const domain = email.split("@")[1]
        if(!VALID_DOMAINS().includes(domain)) {
          throw new APIError("BAD_REQUEST",{
            message:"Invalid domain"
          })
        }
      }
    }) 
  },
  plugins:[nextCookies()]
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN"
