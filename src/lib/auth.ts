import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import { APIError } from "better-auth/api";
import { VALID_DOMAINS } from "./utils";
import { sendEmailAction } from "@/actions/send-email.action";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_API_URL || ""],
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await sendEmailAction({
        to: user.email,
        subject: "Verify your email",
        meta: {
          description: "Please verify your email by clicking the link below",
          link: String(link),
        },
      });
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["COMPANY", "USER"],
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = ctx.body.email as string;
        const domain = email.split("@")[1];
        if (!VALID_DOMAINS().includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain",
          });
        }
      }
    }),
  },
  plugins: [nextCookies()],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
