import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khedmety",
  description: "Khedmety app for church servents subjects",
  keywords: ["church", "servents", "subjects", "khedmety"],
  authors: [
    {
      name: "marco5dev (Mark Maher)",
    },
  ],
  creator: "marco5dev (Mark Maher)",
  publisher: "marco5dev (Mark Maher)",
  // copyright: "2024 Marco5dev (Mark Maher)",
  robots: "index, follow",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "de-DE": "/de",
      "ar-AR": "/ar",
      "ti-TI": "/ti",
      "fr-FR": "/fr",
      "ro-RO": "/ro",
    },
  },
  openGraph: {
    title: "Khedmety",
    description: "Khedmety app for church servents subjects",
    url: "https://khedmety.marco5dev.site",
    siteName: "Khedmety",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Khedmety OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // facebook: {
  //   appId: "marco5dev",
  // },
  // instagram: {
  //   url: "https://instagram.com/marco5dev",
  // },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="twitter:image" content="/twitter-image.png" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
