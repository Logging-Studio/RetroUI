import "./global.css";
import { Archivo_Black, Space_Mono, Geist } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "@/components/retroui";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
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
        <script async src="https://assets.endorsely.com/endorsely.js" data-endorsely="7e205a3d-7039-41f3-9b4f-52929d5489d2" />
      </head>
      <body
        className={`${head.variable} ${geist.variable} ${mono.variable} bg-background text-foreground`}
      >
        <ThemeProvider>
          <AuthProvider initialUser={user}>
            {children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
