import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'GoS Calculator',
    description:
        'A calculator for GOS in Erlang B, Erlang C, and Binomial. Done by Youssef Elshabrawy for CIE591 course supervised by Dr. Samy Soliman.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
