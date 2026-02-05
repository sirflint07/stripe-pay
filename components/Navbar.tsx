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
    <nav className="bg-white py-4 px-8 shadow-sm w-full top-0 z-50 border-b fixed backdrop-blur-sm backdrop-brightness-0">
      <div className="hidden md:flex items-center justify-between w-[90%] mx-auto px-4 py-2">
        <div>
          <Link
            href="/"
            className="font-extrabold text-gray-800 hover:text-blue-600 transition-colors space-x-3 flex items-center"
          >
            <span className="inline-block text-base">COURSEKINGDOM</span>{" "}
            <span className="inline-block">
              <GraduationCap />
            </span>
          </Link>
        </div>

        <div className="flex gap-8 items-center justify-center">
          <Link href="/pro" className="flex items-center space-x-2">
            <span className="inline-block">
              <Zap size={19} />
            </span>
            <span className="inline-block text-base font-light leading-9">
              Pro
            </span>
          </Link>
          <Link href="/billing" className="flex items-center space-x-2">
            <span className="inline-block">
              <CreditCardIcon size={19} />
            </span>
            <span className="inline-block text-base font-light leading-9">
              Billing
            </span>
          </Link>
          <Link href="/courses" className="flex items-center space-x-2">
            <BookOpenIcon size={19} />
            <span className="inline-block text-base font-light leading-9">
              Courses
            </span>
          </Link>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">
                <LogInIcon size={14} />
                Log In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <SignOutButton>
              <Button variant="outline">
                <LogOutIcon size={14} />
                Log Out
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>

      <MobileNavbar />
    </nav>
  );
};

export default Navbar;
