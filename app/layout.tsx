import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextAuthProvider } from "../providers/NextAuthProvider";
import drinkanddrivesmallw from '../public/drink_and_drive_small_white.png';
import Image from "next/image";
import Header from "@/components/header.component"


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Drink n' Drive",
  description: "M0th3r f0Ck1n Dr1nk n Dr1v3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextAuthProvider>
          <Header />
          {children}</NextAuthProvider>
      </body>
    </html>
  );
}
