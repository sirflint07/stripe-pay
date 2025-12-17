'use client';

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
  Menu,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      
        <div className="md:hidden flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-extrabold text-gray-800 hover:text-blue-600 transition-colors flex items-center"
          >
            <span className="text-base">COURSEKINGDOM</span>
            <span className="ml-2">
              <GraduationCap size={20} />
            </span>
          </Link>

          
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

      {isMenuOpen && (
        <AnimatePresence>
            <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="md:hidden fixed inset-0 z-40 mt-16">
            {/* Backdrop */}
            <div 
                className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg"
                onClick={toggleMenu}
            />
            
            
            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg animate-in slide-in-from-right-5 duration-300">
                <div className="p-6 flex flex-col h-full">
                
                <div className="flex-1 space-y-6">
                    <Link
                    href="/pro"
                    onClick={toggleMenu}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                    <Zap size={20} />
                    <span className="font-medium">Pro</span>
                    </Link>

                    <Link
                    href="/billing"
                    onClick={toggleMenu}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                    <CreditCardIcon size={20} />
                    <span className="font-medium">Billing</span>
                    </Link>

                    <Link
                    href="/courses"
                    onClick={toggleMenu}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                    <BookOpenIcon size={20} />
                    <span className="font-medium">Courses</span>
                    </Link>
                </div>

                
                <div className="pt-6 border-t space-y-4">
                    <SignedOut>
                    <SignInButton mode="modal">
                        <Button 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={toggleMenu}
                        >
                        <LogInIcon size={16} />
                        Log In
                        </Button>
                    </SignInButton>
                    </SignedOut>

                    <SignedIn>
                    <div className="space-y-3">
                        <div className="flex items-center justify-center">
                        <UserButton />
                        </div>
                        <SignOutButton>
                        <Button 
                            variant="outline" 
                            className="w-full flex items-center justify-center gap-2"
                            onClick={toggleMenu}
                        >
                            <LogOutIcon size={16} />
                            Sign Out
                        </Button>
                        </SignOutButton>
                    </div>
                    </SignedIn>
                </div>
                </div>
            </div>
            </motion.div>
        </AnimatePresence>
      )}

    </>
  );
};

export default MobileNavbar;