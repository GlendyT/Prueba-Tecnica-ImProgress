import type { Metadata } from "next";
import "./globals.css";
import { PerformanceProvider } from "@/context/PerformanceProvider";

export const metadata: Metadata = {
  title: "Performance Dashboard",
  description: "Performance dashboard for employees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <PerformanceProvider>{children}</PerformanceProvider>
      </body>
    </html>
  );
}
