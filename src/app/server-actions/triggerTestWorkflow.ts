"use server"

import { novuAction } from "@/services/safe-actions"
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  message: z.string(),
});

export const triggerTestWorkflow = novuAction
.schema(schema)
.action(async({ ctx: { userNovu, novu }, parsedInput: { message } }) => {
  // console.log("userNovu", userNovu.subscriberId, userDb);
  const res = await novu.trigger('tes-inapp-onesignal-v2', {
    to: {
      subscriberId: userNovu.subscriberId
    },
    payload: {
      message
    }
  });
  revalidatePath("/novu");
  return res.data.data
})