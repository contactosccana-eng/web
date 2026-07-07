import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | ComuArica",
  description: "Copia los datos bancarios para realizar transferencias de registro.",
};

export default function RegistroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
