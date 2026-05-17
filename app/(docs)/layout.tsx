import AppLayout from "@/components/AppLayout";

export default function DocsGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
