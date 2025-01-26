import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Amplify } from "aws-amplify";
import awsConfig from "@/lib/aws-exports";
import TopNavbar from "@/components/topNavbar";
import { SessionProvider } from "@/components/providers/session";
import { Toaster } from "@/components/ui/toaster";

// Load fonts
const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

// Configure Amplify
Amplify.configure(awsConfig);

export const metadata: Metadata = {
  title: "Funnels",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <body className="antialiased flex max-w-full min-h-screen">
        <SessionProvider>
          <TopNavbar />
          <section className="mt-16 w-full">
            {children}
            <Toaster />
          </section>
        </SessionProvider>
      </body>
    </html>
  );
}
