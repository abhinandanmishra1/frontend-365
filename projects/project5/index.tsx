import { Gem, MenuIcon, X } from "lucide-react";
import React, { useState } from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface NavbarProps {
  sticky?: boolean;
  logo: React.ReactNode;
  children: React.ReactNode;
}

const Navbar = ({ sticky, logo, children }: NavbarProps) => {
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/");
  };
  return (
    <nav
      className={cn(
        `${sticky && "sticky"} top-0 
        left-0 navbar navbar-expand-lg 
        navbar-light bg-[#f1f1f1]
        dark:text-white
        dark:bg-[#111] text-black px-4 py-4
        flex justify-between items-center  cursor-pointer`
      )}
    >
      <div onClick={navigateToHome}>{logo}</div>
      <div>{children}</div>
    </nav>
  );
};

const NavbarItems = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <ul
        className={cn(
          `flex gap-4 items-center 
        flex-col md:flex-row absolute md:static
        transition-['width'] duration-300 
        ${open ? "w-[90%] right-0" : "w-0 -right-20"} md:w-auto p-4 md:p-0 
        md:pr-2 bg-[#f1f1f1] dark:bg-[#111] md:bg-inherit
      `
        )}
      >
        <span
          className="absolute -top-2 right-2 md:hidden"
          onClick={toggleOpen}
        >
          <X />
        </span>
        {children}
      </ul>
      <span>
        <button
          className={cn(
            `md:hidden text-black dark:text-white text-lg
            dark:hover:text-[#f1f1f1] hover:text-[#f1f1f1]  transition-all duration-150
            p-2 rounded-full
            `
          )}
          onClick={toggleOpen}
        >
          <MenuIcon />
        </button>
      </span>
    </>
  );
};

const NavbarItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="dark:text-white text-black hover:text-blue-600 dark:hover:text-gray-400">
      {children}
    </li>
  );
};

export default function Project5() {
  return (
    <div className="h-64 w-[90%] m-auto overflow-y-auto overflow-x-hidden border border-gray-300 dark:border-gray-700 rounded-t-lg">
      <Navbar
        sticky
        logo={
          <div className="flex items-center gap-2">
            <Gem /> Logo
          </div>
        }
      >
        <NavbarItems>
          <NavbarItem>
            <Link href="#" className="">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#about" className="">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#contact" className="">
              Contact
            </Link>
          </NavbarItem>
        </NavbarItems>
      </Navbar>
      <div className="p-5 h-80 space-y-3">
        <h1 className="text-3xl font-bold">Project 5: Responsive Navbar</h1>
        <p>Scroll, Navbar is sticky</p>
      </div>
      <p className="p-5">This is the end</p>
    </div>
  );
}
