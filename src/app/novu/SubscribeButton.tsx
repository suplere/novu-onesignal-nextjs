"use client";
import React from "react";
import { onesignalSetCredentials } from "../server-actions/onesignalSetCredentials";

export const SubscribeButton = () => {
  const onClick = async () => {
    await onesignalSetCredentials()
    // console.log("OneSignal set credentials", res?.data);
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 mx-2 inline-block rounded bg-blue-600 font-semibold px-2 py-1"
    >
      Subscribe
    </button>
  );
};
