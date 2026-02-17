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
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  Menu,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrolled, setScrolled] = useState(false);

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const linkVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05 + 0.1,
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    }),
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between w-full px-4 py-3 bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <Link
          href="/"
          className="font-extrabold text-gray-800 hover:text-blue-600 transition-colors flex items-center gap-2 group"
          onClick={() => isMenuOpen && setIsMenuOpen(false)}
        >
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="text-sm sm:text-base tracking-tight">
            COURSE<span className="text-blue-600">KINGDOM</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <SignedIn>
            <div className="scale-90">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} className="text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} className="text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

     
      <div className="md:hidden h-16 w-full" />

     
      <AnimatePresence>
        {isMenuOpen && (
          <>
           
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMenu}
            />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              
              <div className="bg-gradient-to-br from-gray-600 via-gray-800 to-gray-900 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Menu</h3>
                    <p className="text-xs text-white/80">Navigate CourseKingdom</p>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-1">
                  <motion.div custom={0} variants={linkVariants} initial="closed" animate="open">
                    <Link
                      href="/"
                      onClick={toggleMenu}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                    >
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <HomeIcon size={18} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-700">Home</span>
                    </Link>
                  </motion.div>

                  <motion.div custom={1} variants={linkVariants} initial="closed" animate="open">
                    <Link
                      href="/courses"
                      onClick={toggleMenu}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                    >
                      <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                        <BookOpenIcon size={18} className="text-green-600" />
                      </div>
                      <span className="font-medium text-gray-700">All Courses</span>
                    </Link>
                  </motion.div>

                  <motion.div custom={2} variants={linkVariants} initial="closed" animate="open">
                    <Link
                      href="/pro"
                      onClick={toggleMenu}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                    >
                      <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                        <Zap size={18} className="text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-700">Pro Plan</span>
                      <span className="ml-auto text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full">
                        Premium
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div custom={3} variants={linkVariants} initial="closed" animate="open">
                    <Link
                      href="/billing"
                      onClick={toggleMenu}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                    >
                      <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                        <CreditCardIcon size={18} className="text-amber-600" />
                      </div>
                      <span className="font-medium text-gray-700">Billing</span>
                    </Link>
                  </motion.div>
                </div>

                
                <div className="my-6 border-t border-gray-100" />

                <motion.div custom={4} variants={linkVariants} initial="closed" animate="open">
                  <SignedOut>
                    <div className="space-y-3">
                      <SignInButton mode="modal">
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          onClick={toggleMenu}
                        >
                          <LogInIcon size={16} className="mr-2" />
                          Sign In
                        </Button>
                      </SignInButton>
                      <p className="text-xs text-center text-gray-500">
                        New to CourseKingdom?{" "}
                        <Link href="/sign-up" className="text-blue-600 hover:underline" onClick={toggleMenu}>
                          Create account
                        </Link>
                      </p>
                    </div>
                  </SignedOut>

                  <SignedIn>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <UserButton afterSignOutUrl="/" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">Your Account</p>
                          <p className="text-xs text-gray-500">Manage your profile</p>
                        </div>
                      </div>
                      <SignOutButton>
                        <Button 
                          variant="outline" 
                          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={toggleMenu}
                        >
                          <LogOutIcon size={16} className="mr-2" />
                          Sign Out
                        </Button>
                      </SignOutButton>
                    </div>
                  </SignedIn>
                </motion.div>
              </div>
              
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-center text-gray-500">
                  © {new Date().getFullYear()} CourseKingdom
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;