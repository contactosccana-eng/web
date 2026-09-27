import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check-in VALIENTES 26 | ComuArica",
  description: "Registro de asistencia para VALIENTES 26 de Comunidad Cristiana Arica.",
};

export default function CheckinValientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
