"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import Image from "next/image";

const blockImages = [
  "/images/blocks/block-1.png",
  "/images/blocks/block-2.png",
  "/images/blocks/block-3.png",
  "/images/blocks/block-4.png",
  "/images/blocks/block-5.png",
  "/images/blocks/block-6.png",
  "/images/blocks/block-7.png",
  "/images/blocks/block-8.png",
];

export const BlocksParallax = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // First column: bottom to top
  const translateYUp = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig
  );

  // Middle column: top to bottom (starts from negative to align with others)
  const translateYDown = useSpring(
    useTransform(scrollYProgress, [0, 1], [-400, 400]),
    springConfig
  );

  // Third column: bottom to top
  const translateYUp2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -700]),
    springConfig
  );

  const firstColumn = [blockImages[0], blockImages[1], blockImages[2]];
  const secondColumn = [blockImages[3], blockImages[4]].reverse();
  const thirdColumn = [blockImages[5], blockImages[6], blockImages[7]];

  return (
    <div ref={ref} className="relative h-[500px] overflow-hidden">
      {/* Fade mask top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

      {/* Fade mask bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 h-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-full">
          {/* First Column - Bottom to Top */}
          <motion.div
            style={{ y: translateYUp }}
            className="flex flex-col gap-6 pt-12"
          >
            {firstColumn.map((image, index) => (
              <div
                key={`col1-${index}`}
                className="relative h-[350px] border-y-2 w-full"
              >
                <Image
                  src={image}
                  alt={`Block ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>

          {/* Second Column - Top to Bottom */}
          <motion.div
            style={{ y: translateYDown }}
            className="flex flex-col gap-6 pt-12"
          >
            {secondColumn.map((image, index) => (
              <div
                key={`col2-${index}`}
                className="relative h-[300px]"
              >
                <Image
                  src={image}
                  alt={`Block ${index + 4}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>

          {/* Third Column - Bottom to Top */}
          <motion.div
            style={{ y: translateYUp2 }}
            className="flex flex-col gap-6 pt-12"
          >
            {thirdColumn.map((image, index) => (
              <div
                key={`col3-${index}`}
                className="relative h-[300px]"
              >
                <Image
                  src={image}
                  alt={`Block ${index + 6}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
