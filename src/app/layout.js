import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Creador de Bromas",
  description: "Creador de bromas utilizando el api de Open AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
