import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db"
import CredentialsProvider from "next-auth/providers/credentials";
// import EmailProvider from "next-auth/providers/nodemailer";
import GitHubProvider from "next-auth/providers/github";
import { compare, genSalt, hash } from "bcryptjs";
import { Adapter } from "next-auth/adapters";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

async function hashAndSaltPassword(password: string, saltRounds = 10) {
  const salt = await genSalt(saltRounds);
  return hash(password, salt);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        let user = await prisma.user.findFirst({
          where: {
            name: credentials.username!,
          },
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: credentials.username as string,
              password: await hashAndSaltPassword(credentials.password as string),
            },
          });
        }

        if (!user.password) {
          return null;
        }

        const comparison = await compare(credentials.password as string, user.password as string);
        if (comparison) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // We only want to handle this for credentials provider
      if (account?.provider !== "credentials") {
        return true;
      }

      // Our session/cookie settings
      const tokenName =
        process.env.NODE_ENV === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token";

      const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const token = randomBytes(32).toString("hex");
      // const token = require("crypto").randomBytes(32).toString("hex");

      // Create a session in our database
      await prisma.session.create({
        data: {
          sessionToken: token,
          userId: user.id as string,
          expires: expireAt,
        },
      });

      // Set our cookie
      cookies().set(tokenName, token, {
        expires: expireAt,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: "/",
      });

      // Return to "/" after sign in
      return "/";
    },
  },
  debug: process.env.NODE_ENV === "development",
})

