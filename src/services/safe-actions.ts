import { createSafeActionClient } from "next-safe-action";
import { Novu } from "@novu/node";
import { BACKEND_URL } from "@/utils/const";
import { auth } from "./auth";
import { prisma } from "./db";

export const actionClient = createSafeActionClient();

const NOVU_SECRET_KEY = process.env.NOVU_SECRET_KEY as string;

export const novuAction = createSafeActionClient().use(async ({ next }) => {
  // Insert your Novu API Key here
  const novu = new Novu(NOVU_SECRET_KEY, {
    backendUrl: BACKEND_URL,
  });
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("You are not logged in. You must be logged in to perform this action.");
  }
  const userDb = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!userDb) {
    throw new Error("User not found.");
  }

  // let novuUser
  // const novuUserRes = await novu.subscribers.get(userDb.id).catch((err) => {
  //   console.log("Error getting user", err);
  // }
  // );
  const subscribeUSerRes = await novu.subscribers.identify(userDb.id, {
      email: userDb.email || "",
      firstName: userDb.name?.split(" ")[0] || "",
      lastName: userDb.name?.split(" ")[1] || "",
      avatar: userDb.image || ""
    });
  // console.log("novuUserRes", subscribeUSerRes.data);
  // if (!novuUserRes.data) {
  //   console.log("Novu user not found.");
    
  //   // novuUser = subscribeUSerRes.data
  // } else {
  //   const res = await novu.subscribers.delete(userDb.id).catch((err) => {
  //     console.log("Error deleting user", err);
  //   }
  //   );
  //   console.log("Delete user", res);
    
  // }
  // console.log("novuUSer", novuUser);
  return next({
    ctx: {
      prisma,
      userDb,
      userNovu: subscribeUSerRes.data.data,
      novu,
      appFrontendUrl: process.env.AUTH_URL,
    },
  });
});