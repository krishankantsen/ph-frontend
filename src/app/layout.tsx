import { Navbar } from "./components/Navbar/Navbar";
import "./globals.css";
export const metadata = {
  title: "PulseHub",
  description: "Social Media Plateform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#e3e3e3" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
