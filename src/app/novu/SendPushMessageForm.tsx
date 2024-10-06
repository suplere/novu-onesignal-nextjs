"use client";
import React from "react";
import { triggerTestWorkflow } from "../server-actions/triggerTestWorkflow";

export const SendPushMessageForm = () => {
  const onClick = async () => {
    const res = await triggerTestWorkflow({ message: "Hello from OneSignal!" });
    console.log("OneSignal set credentials", res?.data);
  }
  return (
    <div className="my-2 flex gap-2">
    <button
      type="button"
      onClick={onClick}
      className="mt-3 mx-2 inline-block rounded bg-blue-600 font-semibold px-2 py-1"
    >
      Trigger test-onesignal-v2
    </button>
    </div>
  );
};
