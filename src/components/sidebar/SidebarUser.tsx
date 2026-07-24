"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function SidebarUser() {
  const { data: session } = useSession();

  const name = session?.user?.name ?? "Administrador";

  const email = session?.user?.email ?? "admin@petmanager.com";

  return (
    <div className="flex items-center gap-3">

      <Avatar className="h-11 w-11">

        <AvatarImage
          src={session?.user?.image ?? ""}
          alt={name}
        />

        <AvatarFallback>
          {name.substring(0, 2).toUpperCase()}
        </AvatarFallback>

      </Avatar>

      <div className="flex-1 overflow-hidden">

        <p className="truncate text-sm font-semibold">
          {name}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {email}
        </p>

      </div>

    </div>
  );
}