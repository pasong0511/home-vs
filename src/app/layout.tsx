import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Head from "next/head";
import FooterNavigation from "@/components/navigation/FooterNavigation";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <head>
                    <title>Home-vs</title>
                </head>
            </Head>
            <body className={inter.className}>
                {children}
                <FooterNavigation />
            </body>
        </html>
    );
}
