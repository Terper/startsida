import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Min startsida",
  description: "",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
