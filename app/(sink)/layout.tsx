import AppLayout from "@/components/AppLayout";

export default function SinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
