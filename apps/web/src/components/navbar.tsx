"use client";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed  top-4 left-0 w-full z-30" style={{ minHeight: 80 }}>
      <div className="mx-5 mt-0 md:mx-20 bg-white shadow-lg rounded-t-2xl rounded-b-2xl flex items-center justify-between px-8 md:px-16 py-3">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={90} height={90} />
        </div>

        <div className="hidden md:flex items-center gap-8 text-text font-medium">
          <a href="#" className="hover:text-success transition">
            Home
          </a>
          <a href="#" className="hover:text-success transition">
            Browse Jobs
          </a>
          <a href="#" className="hover:text-success transition">
            Employers
          </a>
          <a href="#" className="hover:text-success transition">
            Candidates
          </a>
          <a href="#" className="hover:text-success transition">
            Pages
          </a>
          <a href="#" className="hover:text-success transition">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primaryLight/10 px-5 font-semibold"
          >
            Sign In
          </Button>
          <Button className="bg-secondary hover:bg-primaryDark text-buttonText px-5 font-semibold">
            Add Job
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
