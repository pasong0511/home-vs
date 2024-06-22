import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterNavigation from "@/components/navigation/FooterNavigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>Home-vs</title>
            </head>
            <body className={inter.className}>
                <main>{children}</main>
                <FooterNavigation />
            </body>
        </html>
    );
}
