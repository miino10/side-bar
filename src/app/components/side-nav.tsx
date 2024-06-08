"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "../../../constants";
import { SideNavItem } from "../../../types";

const SideNav = () => {
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full">
          <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
          <span className="font-bold text-xl hidden md:flex">Logo</span>
        </Link>

        <div className="flex flex-col space-y-2 md:px-6">
          {SIDENAV_ITEMS.map((item, idx) => (
            <MenuItem
              key={idx}
              item={item}
              index={idx}
              openSubMenuIndex={openSubMenuIndex}
              handleSubMenuToggle={handleSubMenuToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({
  item,
  index,
  openSubMenuIndex,
  handleSubMenuToggle,
}: {
  item: SideNavItem;
  index: number;
  openSubMenuIndex: number | null;
  handleSubMenuToggle: (index: number) => void;
}) => {
  const pathname = usePathname();
  const isSubMenuOpen = openSubMenuIndex === index;

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={() => handleSubMenuToggle(index)}
            className={`flex flex-row items-center p-2 rounded-lg hover:bg-zinc-100 w-full justify-between ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}>
            <div className="flex flex-row space-x-4 items-center">
              <span className="font-semibold text-xl flex">{item.title}</span>
            </div>
            <div className={`${isSubMenuOpen ? "rotate-180" : ""} flex`}></div>
          </button>

          {isSubMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`${subItem.path === pathname ? "font-bold" : ""}`}>
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}>
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
