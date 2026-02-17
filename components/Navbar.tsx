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
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <>
      
      <nav className="hidden md:block bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            
            <Link
              href="/"
              className="font-extrabold text-gray-800 hover:text-blue-600 transition-colors flex items-center gap-2 group"
            >
              <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="text-lg tracking-tight">
                COURSE<span className="text-blue-600">KINGDOM</span>
              </span>
            </Link>

            
            <div className="flex items-center gap-8">
              <Link 
                href="/pro" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <Zap size={18} className="group-hover:text-purple-600 transition-colors" />
                <span className="text-sm font-medium">Pro</span>
              </Link>
              
              <Link 
                href="/billing" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <CreditCardIcon size={18} className="group-hover:text-amber-600 transition-colors" />
                <span className="text-sm font-medium">Billing</span>
              </Link>
              
              <Link 
                href="/courses" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <BookOpenIcon size={18} className="group-hover:text-green-600 transition-colors" />
                <span className="text-sm font-medium">Courses</span>
              </Link>

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
                    <Button variant="outline" size="sm" className="gap-2">
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