"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SidebarSearch() {
  return (
    <div className="border-b p-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-3 text-muted-foreground"
          size={18}
        />

        <Input
          placeholder="Pesquisar..."
          className="pl-10"
        />
      </div>
    </div>
  );
}