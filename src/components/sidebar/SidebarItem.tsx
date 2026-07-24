"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { MenuItem } from "./menu";

interface Props {
  item: MenuItem;
}

export function SidebarItem({ item }: Props) {
  const pathname = usePathname();

  const active = pathname === item.href;

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-md"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        {item.title}
      </div>

      {item.badge && (
        <Badge variant="secondary">
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}