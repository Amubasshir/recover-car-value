import '@/app/globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';

// Optimize font loading by limiting character subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  // Limit the weight to only what's needed
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Recover Car Value',
  description:
    "Get the money back for your car's lost value after an accident with Recover Car Value.",
  generator: 'v0.dev',
  icons: {
    icon: '/car.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to speed up initial page load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SiteHeader />
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
        <SiteFooter />
      </body>
    </html>
  );
}
