import AppLayout from "@/components/AppLayout";
import { LibraryProvider } from "@/contexts/LibraryContext";

export default function DocsGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LibraryProvider>
      <AppLayout>{children}</AppLayout>
    </LibraryProvider>
  );
}
