import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check-in AMADAS | ComuArica",
  description: "Registro de asistencia para AMADAS 2026 de Comunidad Cristiana Arica.",
};

export default function CheckinAmadasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
