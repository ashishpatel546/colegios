import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000080",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "Colegios - Complete School Management System by AppMee",
  description: "A complete feature-rich application to digitalize your school. Manage fees, exams, attendance and much more seamlessly. Built by enthusiastic engineers from AppMee Pvt Ltd.",
  keywords: [
    "School Management System", 
    "Education ERP", 
    "School Management Software", 
    "Best School ERP", 
    "Digital School Platform", 
    "School Digitalization", 
    "Student Information System", 
    "Online School Management", 
    "Fee Management Software", 
    "Exam Management System", 
    "School Attendance Tracker", 
    "Parent-Teacher Communication App", 
    "Cloud-based School ERP", 
    "School Administration Software", 
    "AppMee", 
    "Colegios"
  ],
  authors: [{ name: "AppMee Pvt Ltd" }],
  creator: "AppMee Pvt Ltd",
  publisher: "AppMee Pvt Ltd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Colegios",
    title: "Colegios - Complete School Management System by AppMee",
    description: "A complete feature-rich application to digitalize your school. Manage fees, exams, attendance and much more seamlessly. Built by enthusiastic engineers from AppMee Pvt Ltd.",
    images: [
      {
        url: "/images/banner-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Colegios School Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colegios - Complete School Management System by AppMee",
    description: "A complete feature-rich application to digitalize your school. Manage fees, exams, attendance and much more seamlessly. Built by enthusiastic engineers from AppMee Pvt Ltd.",
    images: ["/images/banner-bg.jpg"],
    creator: "@appmee",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Colegios",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A complete feature-rich application to digitalize your school. Manage fees, exams, attendance and much more seamlessly.",
    "publisher": {
      "@type": "Organization",
      "name": "AppMee Pvt Ltd",
      "url": "https://colegios.appmee.in"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
