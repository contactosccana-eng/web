import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RadioPlayer from "../components/RadioPlayer";

export const metadata: Metadata = {
  title: "Comuarica - Iglesia Cristiana",
  description: "Bienvenidos a Comuarica. Conéctate con nuestra radio en vivo, eventos e información de la iglesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh', paddingTop: '70px' }}>
          {children}
        </main>
        <RadioPlayer />
        <Footer />
      </body>
    </html>
  );
}
