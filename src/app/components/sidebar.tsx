"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const links = [
  { id: 1, href: "/", label: "Dashboard", icon: "&#127968;" },
  { id: 2, href: "/sales", label: "Sales", icon: "&#128184;" },
  { id: 3, href: "/purchases", label: "Purchases", icon: "&#127877;" },
  {
    id: 4,
    label: "Accounting",
    icon: "&#128184;",
    sublinks: [
      { href: "/accounting/chart-of-accounts", label: "Charts of accounts" },
      { href: "/accounting/journals", label: "Journals" },
    ],
  },
  {
    id: 5,
    label: "Reports",
    icon: "&#128201;",
    sublinks: [
      { href: "/reports/chart-of-accounts", label: "Charts of accounts" },
      { href: "/reports/journals", label: "Journals" },
    ],
  },
  { id: 6, href: "/contacts", label: "Contacts", icon: "&#128100;" },
  {
    id: 7,
    label: "Inventory",
    icon: "&#128188;",
    sublinks: [
      { href: "/inventory/invees", label: "inves" },
      { href: "/inventory/memem", label: "kemmee" },
      { href: "/inventory/qeeq", label: "jememe" },
    ],
  },
  { id: 8, href: "/taxes", label: "Taxes", icon: "&#128176;" },
];

const getBasePath = (path: string) => {
  const segments = path.split("/");
  return `/${segments[1]}`;
};

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleDropdown = (id: number, href?: string) => {
    if (href) {
      router.push(href);
    } else {
      setOpenDropdown(openDropdown === id ? null : id);
    }
  };

  const handleSublinkClick = (
    e: React.MouseEvent,
    id: number,
    href: string
  ) => {
    e.stopPropagation();
    setOpenDropdown(id);
    router.push(href);
  };

  useEffect(() => {
    links.forEach((link) => {
      if (link.sublinks) {
        const basePath = getBasePath(pathname);
        if (
          link.sublinks.some((sublink) => sublink.href.startsWith(basePath))
        ) {
          setOpenDropdown(link.id);
        }
      }
    });
  }, [pathname]);

  return (
    <div className="bg-gray-800 text-gray-100 flex flex-col h-screen p-6">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-xl font-semibold">My App</span>
      </div>

      {links.map((link) => (
        <div key={link.id}>
          <div
            onClick={() => handleDropdown(link.id, link.href)}
            className="cursor-pointer flex items-center space-x-2 py-2">
            <span dangerouslySetInnerHTML={{ __html: link.icon }} />
            <span>{link.label}</span>
          </div>
          {openDropdown === link.id && link.sublinks && (
            <div className="pl-6">
              {link.sublinks.map((subLink, index) => (
                <Link
                  key={index}
                  href={subLink.href}
                  onClick={(e) => handleSublinkClick(e, link.id, subLink.href)}>
                  <p className="text-red-400 px-10 cursor-pointer">
                    {subLink.label}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
