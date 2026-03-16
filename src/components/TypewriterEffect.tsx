"use client";

import { useState, useEffect } from "react";

const features = [
  "Online Registration & Admission",
  "Student Information & Fee Management",
  "Progress & Exam Result",
  "Fully Customize & Scalable",
  "Android and IOS apps",
  "100% Cloud-Based Platform",
  "Report Dashboards"
];

export default function TypewriterEffect() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = features[index];
    const typeSpeed = isDeleting ? 30 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % features.length);
      } else {
        const nextText = isDeleting
          ? currentText.substring(0, text.length - 1)
          : currentText.substring(0, text.length + 1);
        setText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <span className="inline-flex items-center">
      <span>{text}</span>
      <span className="w-[3px] h-[1em] ml-[2px] bg-yellow-400 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
    </span>
  );
}
