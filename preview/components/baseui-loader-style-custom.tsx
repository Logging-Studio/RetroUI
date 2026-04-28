import { Loader } from "@/components/base-retroui/Loader";

export default function LoaderPreview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Loader count={4} />
        <Loader count={5} delayStep={80} />
      </div>
      <div className="flex items-center gap-4">
        <Loader duration={1.5} />
        <Loader variant="secondary" count={4} duration={1.2} delayStep={120} />
      </div>
    </div>
  );
}
