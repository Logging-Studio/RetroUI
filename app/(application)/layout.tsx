import AppLayout from "@/components/AppLayout";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
