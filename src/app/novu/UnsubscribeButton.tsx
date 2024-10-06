"use client";
import React from "react";
import { onesignalDeleteCredentials } from "../server-actions/onesignalDeleteCredentials";

export const UnsubscribeButton = () => {
  const onClick = async () => {
    await onesignalDeleteCredentials()
    // console.log("OneSignal set credentials", res?.data);
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 mx-2 inline-block rounded bg-blue-600 font-semibold px-2 py-1"
    >
      Unsubscribe
    </button>
  );
};
