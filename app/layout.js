import Header from "@/components/header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
 import { dark } from '@clerk/themes'
import { Toaster } from "sonner";

export const metadata = {
  title: "spott",
  description: "Discover and create amazing events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClerkProvider 
           appearance={{
     theme: dark,
   }}>
            <ConvexClientProvider>

              {/* Header */}

              <Header />

              <main className="relative min-h-screen container mx-auto pt-40 md:pt-32">
                {/* glow */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 min-h-[80vh]">
                  {children}
                </div>
              </main>

              {/* Footer */}
              <footer className="border-t border-gray-800/50 py-8 px-6 max-w-7xl mx-auto">
                <div className="text-sm text-gray-400">
                  made by Manas
                </div>
              </footer>
              <Toaster position="top-center" richColors/>

            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
