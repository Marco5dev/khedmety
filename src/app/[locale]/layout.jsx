import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utils/SessionsProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children, params }) {
  const dir = params.locale === "ar" ? "rtl" : "ltr";
  const session = await getServerSession();
  return (
    <html lang={params.locale} dir={dir}>
      <head>
        {/* Title */}
        <title>Khedmety</title>

        {/* Meta Tags */}
        <meta
          name="description"
          content="Khedmety app for church servents subjects"
        />
        <meta name="keywords" content="church, servents, subjects, khedmety" />
        <meta name="author" content="marco5dev (Mark Maher)" />
        <meta name="creator" content="marco5dev (Mark Maher)" />
        <meta name="publisher" content="marco5dev (Mark Maher)" />
        <meta name="robots" content="index, follow" />

        {/* Canonical Link */}
        <link rel="canonical" href="https://khedmety.marco5dev.site/" />

        {/* Alternate Languages */}
        <link
          rel="alternate"
          href="https://khedmety.marco5dev.site/en"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://khedmety.marco5dev.site/de"
          hrefLang="de"
        />
        <link
          rel="alternate"
          href="https://khedmety.marco5dev.site/ar"
          hrefLang="ar"
        />
        <link
          rel="alternate"
          href="https://khedmety.marco5dev.site/ti"
          hrefLang="ti"
        />
        <link
          rel="alternate"
          href="https://khedmety.marco5dev.site/fr"
          hrefLang="fr"
        />
        <link
          rel="alternate"
          href="https://khedmety.marco5dev.site/ro"
          hrefLang="ro"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Khedmety" />
        <meta
          property="og:description"
          content="Khedmety app for church servents subjects"
        />
        <meta property="og:url" content="https://khedmety.marco5dev.site" />
        <meta property="og:site_name" content="Khedmety" />
        <meta
          property="og:image"
          content="https://khedmety.marco5dev.site/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Khedmety OG Image" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <AuthProvider session={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
