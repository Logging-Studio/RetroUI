"use client";

import TopNav from "@/components/TopNav";
import { useState, useEffect } from "react";
import Footer from "./footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const [copied, setCopied] = useState(false);
  const couponCode = "V2LAUNCH30";
  const targetDate = new Date("2026-05-07T23:59:59");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      setTimeLeft(`${days}d ${hours}h`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <>
      <div className="bg-foreground text-background py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap text-sm">
          <span>🎉 Special discount for 2.0 launch</span>
          |
          <div className="flex items-center gap-2 bg-background px-1.5 py-1 rounded-xs text-foreground font-bold">
            <span className="font-mono text-xs">{couponCode}</span>
            <button
              onClick={copyToClipboard}
              className="hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Copy coupon code"
            >
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-in fade-in zoom-in duration-200"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              )}
            </button>
          </div>
          |
          <span>Ends in: {timeLeft}</span>
        </div>
      </div>
      <TopNav />
      {children}
      <Footer />
    </>
  );
}


// <Tabs.Root defaultValue="react">
//   <Tabs.List className="bg-foreground h-10 flex justify-center items-end">
//     <div className="bg-background pt-1 px-1">
//       <Tabs.Tab value="react" className="data-active:bg-card data-active:border-2 font-medium text-foreground px-4 py-0.5 text-sm">
//         <Link href="/" className="flex items-center">
//           <Image src="/images/icons/react.svg" alt="React" width={16} height={16} className="mr-2" />
//           React
//         </Link>
//       </Tabs.Tab>
//       <Tabs.Tab value="figma" className="data-active:bg-card data-active:border-2 font-medium text-foreground px-4 py-0.5 text-sm">
//         <Link href="/figma" className="flex items-center">
//           <Image src="/images/icons/figma.svg" alt="Figma" width={12} height={12} className="mr-2" />
//           Figma
//         </Link>
//       </Tabs.Tab>
//     </div>
//     <Tabs.Indicator />
//   </Tabs.List>
//   <TopNav />
//   <Tabs.Panel value="react">
//     <div>
//       {children}
//     </div>
//   </Tabs.Panel>
//   <Tabs.Panel value="figma">
//     {children}
//   </Tabs.Panel>
// </Tabs.Root>