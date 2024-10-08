import NextAuth from "next-auth"
import authConfig from "./services/auth.config"
 
export const { auth: middleware } = NextAuth(authConfig)
// export { auth as middleware } from "@/services/auth"

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}