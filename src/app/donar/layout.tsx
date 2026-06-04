import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diezmos, Ofrendas e Inscripciones | ComuArica",
  description: "Copia los datos bancarios para realizar transferencias de diezmos, ofrendas e inscripciones.",
};

export default function DonarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
