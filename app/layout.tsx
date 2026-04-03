import TopNav from "@/components/TopNav";
import "./global.css";
import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import Image from "next/image";
import { Metadata } from "next";
import { Tabs } from '@base-ui/react/tabs';
import { Toaster } from "@/components/retroui";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/contexts/ThemeContext";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

const head = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeoBrutalism Styled React Components | RetroUI",
  description:
    "RetroUI - NeoBrutalism styled component library built with React and TailwindCSS for modern web apps.",
  openGraph: {
    images: "https://retroui.dev/banner.png",
    title: "NeoBrutalism Styled React Components | RetroUI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const darkMode = localStorage.getItem('darkMode');
                  if (darkMode === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error applying theme:', e);
                }
              })();
            `,
          }}
        />
        {/* <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="97dd6182-c656-4265-97e0-ee9613b88078"
        /> */}
        <script
          defer
          data-website-id="dfid_zlQSgC5h2RNuCLHQTf7Fd"
          data-domain="retroui.dev"
          src="https://datafa.st/js/script.js">
        </script>
      </head>
      <body
        className={`${head.variable} ${sans.variable} ${mono.variable}`}
      >
        <ThemeProvider>
          <Tabs.Root defaultValue="react">
            <Tabs.List className="bg-foreground h-10 flex justify-center items-end">
              <div className="bg-background pt-1 px-1">
                <Tabs.Tab value="react" className="data-active:bg-card data-active:border-2 font-medium text-foreground px-4 py-0.5 text-sm">
                  <div className="flex items-center">
                    <Image src="/images/icons/react.svg" alt="React" width={16} height={16} className="mr-2" />
                    React
                  </div>
                </Tabs.Tab>
                <Tabs.Tab value="figma" className="data-active:bg-card data-active:border-2 font-medium text-foreground px-4 py-0.5 text-sm">
                  <div className="flex items-center">
                    <Image src="/images/icons/figma.svg" alt="Figma" width={12} height={12} className="mr-2" />
                    Figma
                  </div>
                </Tabs.Tab>
              </div>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value="react">
              <div className="bg-background text-foreground">
                <TopNav />
                {children}
                <Toaster />
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="figma">
              <div className="bg-background text-foreground">
                Figma
              </div>
            </Tabs.Panel>
          </Tabs.Root>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
