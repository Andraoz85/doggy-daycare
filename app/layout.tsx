// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DogsProvider } from "./context/DogsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Doggy Daycare",
    description: "A dog daycare app",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="en">
            <body className="bg-yellow-200">
                <div className="max-w-md mx-auto min-h-screen p-4">
                    <DogsProvider>{children}</DogsProvider>
                </div>
            </body>
        </html>
    );
}
