import {ReactNode} from "react";
import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'
import {GoogleTagManager} from "@/components/google-tag-manager/google-tag-manager";

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({
                                             children,
                                           }: {
  children: ReactNode
}) {
  return (
      <>
        <SpeedInsights/>
        <GoogleTagManager/>
        {children}
        <Analytics/>
      </>
  )
}
