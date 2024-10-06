"use server"

import { novuAction } from "@/services/safe-actions"
import { revalidatePath } from "next/cache";

export const onesignalSetCredentials = novuAction
.action(async({ ctx: { userNovu, novu } }) => {
  // console.log("userNovu", userNovu.subscriberId, userDb);
  const res = await novu.subscribers.setCredentials(userNovu.subscriberId, "one-signal-v2", {
    deviceTokens: [userNovu.subscriberId],
  })
  revalidatePath("/novu");
  return res.data.data
})