import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupProvider from "@/components/PopupProvider";
import { getActivePopups } from "@/lib/popup-actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://autosaver-blog-insu.vercel.app'),
  title: {
    default: "AutoSaver - Find Cheaper Car Insurance in Minutes | Save up to $500",
    template: "%s | AutoSaver"
  },
  description: "Compare car insurance quotes from top providers and save up to $500 per year. Free, fast, and secure comparison tool. Get instant quotes from 50+ insurers.",
  keywords: ["car insurance", "cheap car insurance", "insurance quotes", "compare insurance", "auto insurance", "insurance savings", "car insurance comparison", "best car insurance rates"],
  authors: [{ name: "AutoSaver" }],
  creator: "AutoSaver",
  publisher: "AutoSaver",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autosaver-blog-insu.vercel.app',
    title: 'AutoSaver - Find Cheaper Car Insurance in Minutes',
    description: 'Compare car insurance quotes from top providers and save up to $500 per year. Free, fast, and secure.',
    siteName: 'AutoSaver',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'AutoSaver Car Insurance Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoSaver - Find Cheaper Car Insurance in Minutes',
    description: 'Compare car insurance quotes and save up to $500 per year',
    images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=630&fit=crop'],
  },
  verification: {
    google: 'your-google-verification-code',
    // Add your verification codes
  },
  alternates: {
    canonical: 'https://autosaver-blog-insu.vercel.app',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const popups = (await getActivePopups()) || [];
  
  // Server-side log
  console.log('[RootLayout] Fetched popups from database:', popups.length, 'active popups');
  if (popups.length > 0) {
    console.log('[RootLayout] Popup details:', popups.map(p => ({ 
      id: p.id, 
      name: p.name, 
      triggerType: p.triggerType,
      displayPages: p.displayPages 
    })));
  }

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KX9XC2KJ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KX9XC2KJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Header />
        <main>{children}</main>
        <Footer />
        <PopupProvider popups={popups} />
      </body>
    </html>
  );
}
