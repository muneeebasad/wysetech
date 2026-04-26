import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  title: "Wysetech Technologies — Managed IT, Cybersecurity & DevOps",
  description:
    "Wysetech Technologies provides managed IT support, cybersecurity, SIEM, DevOps, and network monitoring services for businesses. Based in Rawalpindi, Pakistan.",
  metadataBase: new URL("https://wysetech.com.pk"),
  openGraph: {
    title: "Wysetech Technologies — Managed IT, Cybersecurity & DevOps",
    description:
      "Enterprise-grade managed IT management, cybersecurity, and DevOps solutions for growing businesses.",
    url: "https://wysetech.com.pk",
    siteName: "Wysetech Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wysetech Technologies",
    description: "Managed IT. Secured. Automated.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  keywords: [
    "managed IT services",
    "MSP Pakistan",
    "cybersecurity",
    "SIEM",
    "DevOps",
    "network monitoring",
    "Rawalpindi",
    "IT support",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-bg-dark text-text-primary">
        {children}
      </body>
    </html>
  );
}
