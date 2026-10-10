"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User as UserIcon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/account", label: "Account" },
  ];

  return (
    <header className="navbar">
      <Link href="/" className="logo">
        FIT<span>CAMP</span>
      </Link>

      <nav className="nav-links">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={isActive ? "active" : ""}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
