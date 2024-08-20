"use client";

import { useLayoutEffect, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const useRegisterGSAP = () => {
    useIsomorphicLayoutEffect (() => {
    gsap.registerPlugin(
      useGSAP,
      ScrollTrigger,
    );
  }, []);

  return null;
};

export default useRegisterGSAP;