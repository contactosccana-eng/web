import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch | ComuArica",
  description: "Copia los datos bancarios para realizar transferencias de merchandising.",
};

export default function MerchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
