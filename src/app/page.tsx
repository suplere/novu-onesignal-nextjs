import { auth } from "@/services/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="mx-auto border w-96 rounded p-6 my-6 border-gray-700">
      <div>Status: {session ? "authenticated" : "unauthenticated"}</div>
      {session ? (
        <>
          <pre className="overflow-y-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
          <div className="mt-3 flex gap-2">
            <Link
              href={`/onesignal`}
              className="inline-block rounded bg-blue-600 font-semibold px-2 py-1"
            >
              Onesignal
            </Link>
            <Link
              href={`/novu`}
              className="inline-block rounded bg-blue-600 font-semibold px-2 py-1"
            >
              Novu
            </Link>
            <Link
              href="/api/auth/signout"
              className="inline-block rounded bg-blue-600 font-semibold px-2 py-1"
            >
              Logout
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link
            href="/api/auth/signin"
            className="mt-3 inline-block rounded bg-blue-600 font-semibold px-2 py-1"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
}
