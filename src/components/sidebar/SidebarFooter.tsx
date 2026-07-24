"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { SidebarUser } from "./SidebarUser";

export function SidebarFooter() {
  return (
    <footer className="border-t p-4">

      <SidebarUser />

      <Button
        variant="outline"
        className="mt-4 w-full justify-start"
        onClick={() => signOut()}
      >
        <LogOut className="mr-2 h-4 w-4" />

        Sair

      </Button>

    </footer>
  );
}