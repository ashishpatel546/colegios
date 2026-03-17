import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Colegios",
  description: "Get in touch with the AppMe team to digitalize your school. Request a comprehensive demo of Colegios.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
