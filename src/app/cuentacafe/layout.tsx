import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cafetería | ComuArica",
  description: "Copia los datos bancarios para realizar transferencias de la cafetería.",
};

export default function CuentaCafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
