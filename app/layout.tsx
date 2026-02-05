import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CourseKingdom",
  description: "A platform for premium courses and resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden p-0 m-0 h-screen`}
      >
          <ConvexClientProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
          />
          <div className="absolute top-0 z-[-2] h-screen w-[100vw] bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] "></div>
          <Navbar />
          {children}
          <Toaster duration={1000} position="bottom-right" />
          <Footer />
        </ConvexClientProvider>
       
      </body>
    </html>
  );
}