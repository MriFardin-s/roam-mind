import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/component/theme-provider";

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
    default: "Roam Mind | Explore & Plan Your Next Adventure",
    template: "%s | Roam Mind",
  },
  description: "Discover stunning travel destinations, curated itineraries, and smart AI travel guidance with Roam Mind.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col g-root">
        <ThemeProvider defaultTheme="light">
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-card)',
                color: 'var(--color-foreground)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 24px',
                boxShadow: '0 4px 12px rgba(30, 41, 59, 0.08)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--color-primary)',
                  secondary: 'var(--color-card)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'var(--color-card)',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}