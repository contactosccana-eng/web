import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check-in | ComuArica",
  description: "Registro de asistencia para eventos de Comunidad Cristiana Arica.",
};

export default function CheckinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
