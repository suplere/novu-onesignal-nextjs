"use client"
import { useEffect } from "react"
import OneSignal from "react-onesignal"


export default function Onesignal() {
  useEffect(() => {
    try {
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
        safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID!,
        // allowLocalhostAsSecureOrigin: process.env.NODE_ENV === 'development',
        serviceWorkerParam: {
          scope: '/onesignal/',
        },
        serviceWorkerPath: 'onesignal/OneSignalSDKWorker.js',
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      }).then(() => {
        console.log('Onesignal init - done')
        // OneSignal.login(userId)
        // OneSignal.Debug.setLogLevel('trace')
        // OneSignal.login('rodrigo')
        // OneSignal.User.addAlias('myAlias', '1')
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
    </div>
  );
}








