"use client";

import { HeartHandshake } from "lucide-react";

export function SidebarLogo() {
  return (
    <div className="flex h-20 items-center border-b px-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
        <HeartHandshake size={26} />
      </div>

      <div className="ml-4">
        <h1 className="text-lg font-bold">PetManager</h1>
        <p className="text-xs text-muted-foreground">
          Gestão Inteligente
        </p>
      </div>
    </div>
  );
}