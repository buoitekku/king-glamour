import type { Metadata } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/source-serif-4/index.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  title: {
    default: "King Glamour – sklep jeździecki online",
    template: "%s | King Glamour",
  },
  description:
    "Sklep jeździecki King Glamour: kaski, siodła, derki, ochraniacze, odzież i wyposażenie stajni. Wysyłka w 24h, darmowa dostawa od 299 zł, zwrot do 30 dni.",
  metadataBase: new URL("https://kingglamour.pl"),
  openGraph: { type: "website", locale: "pl_PL", siteName: "King Glamour" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
