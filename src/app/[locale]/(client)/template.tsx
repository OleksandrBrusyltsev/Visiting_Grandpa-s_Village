"use client";

import React from "react";
import { usePathname } from "next/navigation";

import AskGrandpa from "@/components/AskGrandpa/AskGrandpa";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return <React.Fragment key={pathname}>
        {children}
        <AskGrandpa />
    </React.Fragment>
  }