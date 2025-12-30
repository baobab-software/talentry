"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-0 w-full z-30" style={{ minHeight: 80 }}>
      <div className="mx-5 mt-0 md:mx-20 bg-white shadow-lg rounded-t-2xl rounded-b-2xl flex items-center justify-between px-8 md:px-16 py-3">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={90} height={90} />
        </div>

        <div className="hidden md:flex items-center gap-8 text-text font-medium">
          <a href="#" className="hover:text-success transition">
            Home
          </a>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-success transition outline-none">
              Jobs
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <a href="/jobs/search" className="cursor-pointer">
                  Search Jobs
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/jobs/browse" className="cursor-pointer">
                  Browse Jobs
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/jobs/saved" className="cursor-pointer">
                  Saved Jobs
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/jobs/applied" className="cursor-pointer">
                  Applied Jobs
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-success transition outline-none">
              Employers
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <a href="/employers/post-job" className="cursor-pointer">
                  Post a Job
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/employers/manage-jobs" className="cursor-pointer">
                  Manage Jobs
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/employers/candidates" className="cursor-pointer">
                  View Candidates
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/employers/pricing" className="cursor-pointer">
                  Pricing Plans
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="#" className="hover:text-success transition">
            Job Seeker
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