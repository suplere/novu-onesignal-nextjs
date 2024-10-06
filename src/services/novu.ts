"use server";

import { BACKEND_URL } from "@/utils/const";
import { Novu } from "@novu/node";

export const novu = () => new Novu(process.env.NOVU_SECRET_KEY!, {
  backendUrl: BACKEND_URL,
});
