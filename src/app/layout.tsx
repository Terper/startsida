import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/utils/Providers";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
