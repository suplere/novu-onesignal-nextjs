import { auth } from "@/services/auth";
import { redirect } from "next/navigation";
import { Onesignal } from "./Onesignal";
import Link from "next/link";

export default async function OnesignalPage() {
  const session = await auth();
  if (!session || !session.user?.id) {
    redirect("/");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Onesignal userId={session.user.id} />
      <Link
        href={`/`}
        className="mt-3 mx-2 inline-block rounded bg-blue-600 font-semibold px-2 py-1"
      >
        Back
      </Link>
    </div>
  );
}
