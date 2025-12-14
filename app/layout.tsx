import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupProvider from "@/components/PopupProvider";
import { getActivePopups } from "@/lib/popup-actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoSaver - Find Cheaper Car Insurance in Minutes",
  description: "Compare car insurance quotes from top providers and save up to $500 per year. Free, fast, and secure comparison tool.",
  keywords: "car insurance, cheap car insurance, insurance quotes, compare insurance, auto insurance",
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
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <PopupProvider popups={popups} />
      </body>
    </html>
  );
}
