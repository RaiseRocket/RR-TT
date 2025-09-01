import type { Metadata } from "next";
import { Providers } from './providers';
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "RaiseRocket - Professional Salary Negotiation",
  description: "Expert salary negotiation strategies that help professionals secure better compensation packages with confidence and proven tactics.",
  keywords: ["salary negotiation", "career coaching", "compensation strategy", "professional development"],
  authors: [{ name: "RaiseRocket Team" }],
  creator: "RaiseRocket",
  publisher: "RaiseRocket",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
