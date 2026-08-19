import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  onDark = false,
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <Reveal
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start"} ${className}`}
    >
      <span className="rail mb-5" />
      {eyebrow ? (
        <span className={`eyebrow mb-3 ${onDark ? "text-brand-200/80" : ""}`}>{eyebrow}</span>
      ) : null}
      <h2 className={`headline max-w-3xl ${onDark ? "text-white" : ""}`}>{title}</h2>
      {lede ? (
        <p
          className={`lede mt-5 max-w-2xl ${onDark ? "text-brand-100/80" : ""} ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
