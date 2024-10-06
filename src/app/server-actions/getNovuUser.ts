"use server"

import { novuAction } from "@/services/safe-actions"

export const getNovuUser = novuAction
.action(async({ ctx: { userNovu } }) => {
  return userNovu
})