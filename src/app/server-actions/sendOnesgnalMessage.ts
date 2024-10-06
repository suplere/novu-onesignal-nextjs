"use server";

import { actionClient } from "@/services/safe-actions";
import axios from "axios";
import { z } from "zod";

const schema = z.object({
  userId: z.string(),
});

const axiosInstance = axios.create({
  baseURL: "https://api.onesignal.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
  },
});

export const sendOnesignalMessage = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { userId } }) => {
    // console.log("sendOnesignalMessage", userId);
    // console.log(axiosInstance.defaults.headers);
    const notification = {
      app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
      target_channel: "push",
      include_aliases: {
        external_id: [userId],
      },
      contents: { en: "Test message" },
      headings: { en: "test" },
      subtitle: { en: "Test subtitle" },
      data: {},
      ios_badge_type: "Increase",
      ios_badge_count: 1,
      // ios_sound: sound,
      // android_sound: sound,
      // mutable_content: overrides.mutableContent,
      // android_channel_id: overrides.channelId,
      // small_icon: overrides.icon,
      // large_icon: overrides.icon,
      // chrome_icon: overrides.icon,
      // firefox_icon: overrides.icon,
      // ios_category: overrides.categoryId,
    };
    const res = await axiosInstance
      .post("/notifications", JSON.stringify(notification))
      .catch((e) => {
        console.log(e);
        throw e;
      });

    return res?.data;
  });
