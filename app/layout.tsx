import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cover Flow",
  description: "iOS-like Cover Flow for React.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Cover Flow",
    description: "iOS-like Cover Flow for React.",
    url: "https://coverflow.ashishgogula.in",
    siteName: "Cover Flow",
    images: [
      {
        url: "/coverflow.png",
        width: 1200,
        height: 630,
        alt: "Cover Flow",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cover Flow",
    description: "iOS-like Cover Flow for React.",
    images: ["/coverflow.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden mx-4">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
