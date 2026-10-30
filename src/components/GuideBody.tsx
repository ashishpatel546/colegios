"use client";

import { useEffect, useRef } from "react";
import { enhanceGuide } from "@/lib/guideAssets";

/** The rendered guide. The checklists and contents tracking come from enhanceGuide. */
export default function GuideBody({ html, tocId }: { html: string; tocId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return enhanceGuide(ref.current, document.getElementById(tocId));
  }, [html, tocId]);

  return <div ref={ref} className="guide-prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
