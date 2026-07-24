"use client";

import { SidebarLogo } from "./SidebarLogo";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";

export function Sidebar() {
  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        bg-background
        shadow-sm
      "
    >
      <SidebarLogo />

      <SidebarSearch />

      <SidebarNav />

      <SidebarFooter />

    </aside>
  );
}