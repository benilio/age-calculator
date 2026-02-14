import type { Metadata } from "next";
import '@/styles/globals.css'
import React from 'react';

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "Age calculator challenge from Frontend Mentor done by Benício Oliveira. Done using Next.js, Zod, Day.js and React.",
    icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}