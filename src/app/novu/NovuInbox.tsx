"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { Inbox } from '@novu/react';
import { BACKEND_URL, NOVU_APP_ID, SOCKET_URL } from '@/utils/const';

type Props = {
  subscriberId: string;
}
export const NovuInbox = (props:Props) => {
  const router = useRouter();
  return (
    <Inbox
      applicationIdentifier={NOVU_APP_ID}
      subscriberId={props.subscriberId}
      routerPush={(path: string) =>  router.push(path)}
      backendUrl={BACKEND_URL}
      socketUrl={SOCKET_URL}
      preferencesFilter={{ tags: ['general', 'admin', 'security'] }}
    />
  )
}
