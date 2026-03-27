import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkVibe - Your Ultimate Link in Bio Experience",
  description: "Craft a vibrant digital profile with LinkVibe. Manage all your links in one place, customize with stunning themes, and track your audience growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-gray-900`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
