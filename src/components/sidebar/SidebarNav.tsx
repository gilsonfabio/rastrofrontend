"use client";

import { menu } from "./menu";
import { SidebarItem } from "./SidebarItem";

export function SidebarNav() {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">

      {menu.map((group) => (
        <div
          key={group.title}
          className="mb-6"
        >
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </h2>

          <div className="space-y-1">
            {group.items.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
              />
            ))}
          </div>

        </div>
      ))}

    </nav>
  );
}