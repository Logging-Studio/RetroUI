import { Loader } from "@/components/base-retroui/Loader";

export default function LoaderPreview() {
  return (
    <div className="flex items-end gap-4">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </div>
  );
}

