'use client'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import {
  BookOpenIcon,
  CreditCardIcon,
  GraduationCap,
  LogInIcon,
  LogOutIcon,
  Moon,
  Sun,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import MobileNavbar from "./MobileNavbar";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

   useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a placeholder button with the same dimensions
  }
  return (
    <>
      
      <nav className="hidden md:block bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-50 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            
            <Link
              href="/"
              className="font-extrabold text-gray-800 hover:text-blue-600 transition-colors flex items-center gap-2 group"
            >
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="text-lg tracking-tight dark:text-white">
                COURSE<span className="text-blue-600">KINGDOM</span>
              </span>
            </Link>

            
            <div className="flex items-center gap-8">
              <Link 
                href="/pro" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <Zap size={18} className="group-hover:text-purple-600 transition-colors" />
                <span className="text-sm font-medium dark:text-gray-100">Pro</span>
              </Link>
              
              <Link 
                href="/billing" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <CreditCardIcon size={18} className="group-hover:text-amber-600 transition-colors" />
                <span className="text-sm font-medium dark:text-gray-100">Billing</span>
              </Link>
              
              <Link 
                href="/courses" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <BookOpenIcon size={18} className="group-hover:text-green-600 transition-colors" />
                <span className="text-sm font-medium dark:text-gray-100">Courses</span>
              </Link>
              
               <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="relative p-2.5 rounded-xl backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200"
  aria-label="Toggle theme"
>
  <div className="relative w-5 h-5">
    <Sun 
      className={`absolute inset-0 w-5 h-5 text-amber-600 dark:text-amber-400 transition-all duration-300 ${
        theme === "dark" 
          ? "opacity-0 rotate-90 scale-0" 
          : "opacity-100 rotate-0 scale-100"
      }`}
    />
    <Moon 
      className={`absolute inset-0 w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-all duration-300 ${
        theme === "dark" 
          ? "opacity-100 rotate-0 scale-100" 
          : "opacity-0 -rotate-90 scale-0"
      }`}
    />
  </div>
</button>


              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm" className="gap-2">
                      <LogInIcon size={14} />
                      Log In
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <SignOutButton>
                    <Button variant="outline" size="sm" className="gap-2 dark:text-slate-200">
                      <LogOutIcon size={14} />
                      Log Out
                    </Button>
                  </SignOutButton>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </nav>

     
      <MobileNavbar />

      <div className="h-8 md:h-[72px]" />
    </>
  );
};

export default Navbar;