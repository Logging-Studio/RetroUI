import { Button, Card } from "@/components/retroui";
import {
  ArrowLeftSquare,
  Clock,
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
    <Card className="w-full max-w-sm rounded-2xl">
      {/* header */}
      <Card.Header className="flex flex-row justify-between border-b border-black/50 dark:border-white/50">
        <Button variant="link" className="p-0">
          <ArrowLeftSquare size={20} />
        </Button>
        <p className="text-sm font-bold">Now playing</p>
        <Button variant="link" className="p-0">
          <Heart size={20} />
        </Button>
      </Card.Header>
      {/* card content */}
      <Card.Content className="relative px-4 sm:px-12 py-6 overflow-hidden">
        {/* thumbnail box */}
        <div className="flex items-center gap-3 rounded-md p-2 border-2 border-black dark:border-white">
          <img
            src="/images/punk.svg"
            alt="retro player album"
            className="size-12 object-contain rounded-md border"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold line-clamp-1">Punk Anthem Music</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p>by Punk</p>
              <p className="flex items-center gap-0.5">
                <Clock
                  size={12}
                  className="text-gray-700  dark:text-gray-200 -mt-0.5"
                />{" "}
                02:15
              </p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-md shadow p-3 sm:p-4 border-2 border-black dark:border-white mt-5">
          {/* timeline box */}
          <div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-1 shadow-xs">
              <div className="bg-black dark:bg-white h-1 rounded-full w-1/2 relative">
                <div className="absolute grid hover:scale-110 duration-200 cursor-pointer place-items-center -right-2 top-1/2 -translate-y-1/2 rounded-full border border-black dark:border-white size-4 bg-amber-200">
                  <div className="rounded-full size-2 bg-white dark:bg-black border border-black dark:border-white"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1.5 select-none">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                01:10
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                02:15
              </p>
            </div>
          </div>
          {/* controls */}
          <div className="flex gap-2 sm:gap-3 items-center justify-between mt-3">
            <Button variant="link" className="p-0">
              <Repeat className="size-5 sm:size-6" />
            </Button>
            <Button variant="link" className="p-0">
              <StepBack className="size-5 sm:size-6" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full grid place-items-center p-0 size-12 sm:size-14 bg-transparent"
            >
              <Pause className="size-5 sm:size-5.5" />
            </Button>
            <Button variant="link" className="p-0">
              <StepForward className="size-5 sm:size-6" />
            </Button>
            <Button variant="link" className="p-0">
              <Shuffle className="size-5 sm:size-6" />
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
