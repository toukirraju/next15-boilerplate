import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import './globals.css';
import Providers from '@/Providers';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

// const poppins = Poppins({
//   variable: '--font-poppins',
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: 'Boilerplate',
  description:
    'A boilerplate for building web applications with Next.js, TypeScript, and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme='light' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </head>
      {/* <body className={`${poppins.variable} antialiased`}> */}
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
