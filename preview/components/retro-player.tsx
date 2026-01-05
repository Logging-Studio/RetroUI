import { Button, Card } from "@/components/retroui";
import { Slider } from "@/components/retroui/Slider";
import {
  ArrowLeft,
  Heart,
  Pause,
  Repeat,
  Shuffle,
  Sparkle,
  StepBack,
  StepForward,
} from "lucide-react";


export default function RetroPlayerStyle() {
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-none">
      {/* header */}
      <Card.Header className="flex flex-row justify-between border-b border-black/50 dark:border-white/50">
        <Button variant="ghost" className="p-0">
          <ArrowLeft className="size-5" />
        </Button>
        <p className="text-sm font-bold">Now playing</p>
        <Button variant="ghost" className="p-0">
          <Heart className="size-5" />
        </Button>
      </Card.Header>
      {/* card content */}
      <Card.Content className="relative px-4 sm:px-12 py-6 overflow-hidden">
        {/* thumbnail box */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/images/punk.svg"
            alt="retro player album"
            className="size-12 object-contain rounded-md border"
          />
          <div className="flex-1">
            <p className="font-semibold">Punk Anthem Music</p>
            <p className="text-sm">by Punk</p>
          </div>
        </div>

        <div className="">
          {/* timeline box */}
          <div>
            <Slider value={[50]} />
            <div className="flex items-center justify-between mt-1.5 select-none">
              <p className="text-xs text-muted-foreground">
                01:10
              </p>
              <p className="text-xs text-muted-foreground">
                02:15
              </p>
            </div>
          </div>
          {/* controls */}
          <div className="flex gap-2 sm:gap-3 items-center justify-between mt-3">
            <Button variant="ghost" className="p-0">
              <Repeat className="size-4" />
            </Button>
            <Button variant="ghost" className="p-0">
              <StepBack className="size-5" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full h-14 w-14"
            >
              <Pause className="size-5" />
            </Button>
            <Button variant="ghost" className="p-0">
              <StepForward className="size-5" />
            </Button>
            <Button variant="ghost" className="p-0">
              <Shuffle className="size-4" />
            </Button>
          </div>
        </div>

        <Sparkle
          size={30}
          strokeWidth={0.5}
          className="absolute sm:block hidden -right-2 top-26 fill-amber-300 rotate-12"
        />
        <Sparkle
          size={20}
          strokeWidth={0.5}
          className="absolute sm:block hidden left-1 bottom-20 fill-slate-500"
        />
      </Card.Content>
    </Card>
  );
}
