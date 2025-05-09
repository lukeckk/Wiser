import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import getServerDarkMode from "@/hooks/use-server-dark-mode";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Wiser",
    default: "Wiser"
  },
  description: "Take Control of Your Finances with Smart AI Guidance",
};

export default async function RootLayout({ children }) {
  const theme = await getServerDarkMode()

  return (
    <html lang="en" className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col px-8`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
