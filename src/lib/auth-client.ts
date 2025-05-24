import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { 
  signUp, 
  signIn, 
  signOut, 
  sendVerificationEmail, 
  useSession,
  getSession,
  verifyEmail,
  changePassword,
  forgetPassword,
  resetPassword
} = authClient;
