import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enhmedia.com"),
  title: "ENH — Explore New Heights | Digital Growth Studio, Dubai",
  description:
    "ENH is a Dubai-based digital growth studio crafting brands, campaigns and digital experiences that move markets. Fifteen years. One obsession: growth with proof.",
  openGraph: {
    title: "ENH — Explore New Heights",
    description:
      "A Dubai-based digital growth studio crafting brands, campaigns and experiences that move markets.",
    type: "website",
    locale: "en_AE",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900&display=swap"
        />
      </head>
      <body className="min-h-full bg-void text-snow antialiased">
        <Script id="enh-theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("enh-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`}
        </Script>
        {/* Site chrome lives here so every route gets it, not just the homepage. */}
        <SmoothScroll>
          <div className="grain">
            <Navbar />
            {children}
            <Footer />
            <FloatingContact />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
