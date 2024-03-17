import "./globals.css";

import { Rubik } from 'next/font/google';
import { Toaster } from "sonner";

import { StoreProvider } from "@/store/StoreProvider";

import Bottombar from "./components/HomePage/Bottombar";
import { Navbar } from "./components/HomePage/Navbar";
export const metadata = {
  title: "PulseHub",
  description: "Social Media Plateform",
};
const rubik = Rubik({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
    <html lang="en" className={rubik.className} style={{backgroundColor:"#ededed",color:"#545454"}}>
      <body>
        <Navbar />
        {children}
        <Toaster richColors position="top-center" />
        <Bottombar></Bottombar>
      </body>
    </html>
    </StoreProvider>
  );
}
