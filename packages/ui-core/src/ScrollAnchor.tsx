"use client";

import { useEffect, useRef } from "react";

type ScrollAnchorProps = {
  signal: string | number;
  behavior?: ScrollBehavior;
};

const ScrollAnchor = ({ signal, behavior = "smooth" }: ScrollAnchorProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ block: "end", behavior });
  }, [behavior, signal]);

  return <div ref={ref} aria-hidden />;
};

ScrollAnchor.displayName = "ScrollAnchor";

export { ScrollAnchor };
export type { ScrollAnchorProps };
