import AppLayout from "@/components/AppLayout";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
