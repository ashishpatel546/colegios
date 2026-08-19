import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#0b1b33",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const title = "Colegios — the school operating system by AppMeSoft";
const description =
  "One system for admissions, fees, academics, inventory, visitors and campus safety. HMAC-secured QR ID cards, secure student pickup and a parent app that stays in step. Built for Indian schools by AppMeSoft Private Limited.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: {
    default: title,
    template: "%s · Colegios",
  },
  description,
  applicationName: "Colegios",
  keywords: [
    "School Management System",
    "School ERP",
    "Education ERP India",
    "Student Information System",
    "Fee Management Software",
    "School Inventory Management",
    "School Visitor Management",
    "QR ID Card School",
    "Secure Student Pickup",
    "Exam Management System",
    "School Attendance Tracker",
    "Parent Teacher Communication App",
    "Cloud School ERP",
    "AppMeSoft",
    "AppMeSoft Private Limited",
    "Colegios",
  ],
  authors: [{ name: site.company }],
  creator: site.company,
  publisher: site.company,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Colegios",
    title,
    description,
    images: [
      {
        url: "/images/banner-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Colegios — the school operating system",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/banner-bg.jpg"],
    creator: "@appme",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Colegios",
    operatingSystem: "Web, Android, iOS",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "School Management System",
    description,
    url: site.url,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "0",
      description: "Priced per school on enrolment and modules. Request a quote.",
    },
    featureList: [
      "Admissions and student information",
      "Flexible fee engine with hybrid schedules",
      "Attendance, exams and report cards",
      "Inventory management",
      "Visitor management",
      "HMAC-secured QR ID cards",
      "Secure student pickup",
      "Parent and staff mobile apps",
    ],
    publisher: {
      "@type": "Organization",
      name: site.company,
      url: site.parentSite,
      email: site.email,
      telephone: site.phones[0],
    },
  };

  return (
    <html lang="en-IN">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main id="main" className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
