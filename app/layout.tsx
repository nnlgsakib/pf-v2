import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sans = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const mono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'NLG Sakib | Portfolio',
  description:
    'Professional portfolio for NLG Sakib, showcasing blockchain infrastructure, distributed systems, and full-stack engineering work.',
  icons: {
    icon: 'https://github.com/nnlgsakib.png',
    shortcut: 'https://github.com/nnlgsakib.png',
    apple: 'https://github.com/nnlgsakib.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
