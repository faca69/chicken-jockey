import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
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
  resetPassword,
} = authClient;
