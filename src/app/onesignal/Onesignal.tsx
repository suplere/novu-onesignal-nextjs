"use client";
import React, { useEffect } from "react";
import OneSignal from "react-onesignal";
import { sendOnesignalMessage } from "../server-actions/sendOnesgnalMessage";
type Props = {
  userId: string;
};
export const Onesignal = (props: Props) => {
  useEffect(() => {
    try {
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
        safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID!,
        // allowLocalhostAsSecureOrigin: process.env.NODE_ENV === 'development',
        serviceWorkerParam: {
          scope: "/onesignal/",
        },
        serviceWorkerPath: "onesignal/OneSignalSDKWorker.js",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      }).then(() => {
        console.log("Onesignal init - done");
        OneSignal.login(props.userId);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onOneSignalLogout = async () => {
    try {
      await OneSignal.logout();
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessages = async () => {
    const res = await sendOnesignalMessage({ userId: props.userId });
    console.log(res);
  }

  return (
    <div>
      <div className="text-xs">Reload this page login user again</div>
      <button
        onClick={onOneSignalLogout}
        type="button"
        className="my-4 inline-block rounded bg-blue-600 font-semibold px-2 py-1"
      >
        Onesignal logout on this devices
      </button>
      <button
        onClick={sendMessages}
        type="button"
        className="inline-block rounded bg-blue-600 font-semibold px-2 py-1"
      >
        Send message to all my logged devices via API
      </button>
    </div>
  );
};
