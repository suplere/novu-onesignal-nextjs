import { auth } from "@/services/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
// import { NovuInbox } from "./NovuInbox";
import { getNovuUser } from "../server-actions/getNovuUser";
import { SubscribeButton } from "./SubscribeButton";
import { UnsubscribeButton } from "./UnsubscribeButton";
import { SendPushMessageForm } from "./SendPushMessageForm";

export default async function OnesignalPage() {
  const session = await auth();
  if (!session || !session.user?.id) {
    redirect("/");
  }
  const res = await getNovuUser()
  const novuUser = res?.data || null;
  // console.log("User", res);

  return (
    <div className="p-4">
      <header className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">Novu test</h1>
        <div>
          {/* <NovuInbox subscriberId={session.user.id}/> */}
        </div>
      </header>
      <div className="flex gap-2">
        <SubscribeButton />
        <UnsubscribeButton />
      </div>
      <SendPushMessageForm />
      <div className="my-2">
        {JSON.stringify(novuUser.channels, null, 2)}
      </div>
      <Link
        href={`/`}
        className="mt-3 mx-2 inline-block rounded bg-blue-600 font-semibold px-2 py-1"
      >
        Back
      </Link>
    </div>
  );
}
