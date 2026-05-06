import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/Provider";
import ReduxProvider from "@/redux/ReduxProvider";
import InitUser from "@/InitUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RYDEX - Smart Vehicle Booking Platform",
  description: "RYDEX is a modern multi-vendor vehicle booking platform where users can easily book cars, bikes, and commercial vehicles. With secure login, verified owners, and transparent pricing, RYDEX makes mobility simple and reliable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} 
      antialiased`}>
        <Provider>
        <ReduxProvider>
          <InitUser />
        {children}  {/* children is of type ReactNode */}
        </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
