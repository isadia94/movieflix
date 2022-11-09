import Link from "next/link";
import { useState } from "react";

function MobNav() {
  const links = [
    {
      name: "All",
      tag: "/",
    },
    {
      name: "Movies",
      tag: "/movies",
    },
    {
      name: "Shows",
      tag: "/tv-shows",
    },
    {
      name: "Kids",
      tag: "/kids",
    },
    {
      name: "Discover",
      tag: "/new",
    },
    {
      name: "Popular",
      tag: "/popular",
    },
    {
      name: "Recents",
      tag: "/recents",
    },
  ];
  return (
    <div className="flex w-screen items-center my-6 space-x-4 overflow-x-scroll sm:hidden hideScrollbar">
      {links.map((link) => (
        <Link href={link.tag} className="text-sm" active>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default MobNav;
