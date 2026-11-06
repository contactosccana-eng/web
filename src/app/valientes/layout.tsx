import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valientes 26 | ComuArica",
  description:
    "Valientes 26: del 12 al 15 de noviembre en Campus Lluta km 15, Arica. Adhesión $35.000. Cupos limitados. Regístrate en comuarica.cl.",
  openGraph: {
    title: "Valientes 26",
    description: "12–15 NOV · Campus Lluta km 15 · Arica, Chile · Adhesión $35.000",
    images: ["/valientes/afiche-horizontal.jpg"],
  },
};

export default function ValientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
