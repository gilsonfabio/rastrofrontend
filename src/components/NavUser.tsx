"use client";

import {
  ChevronsUpDown,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser() {
  const { data: session } = useSession();

  const { setTheme } = useTheme();

  const user = {
    name: session?.user?.name ?? "Administrador",
    email: session?.user?.email ?? "admin@petmanager.com",
    empresaId: session?.user?.empresaId ?? "Empresa-XX",
    image: session?.user?.image ?? "",
  };

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="ghost"
          className="h-12 gap-3 px-2"
        >
          <Avatar className="h-9 w-9">

            <AvatarImage src={user.image} />

            <AvatarFallback>
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>

          </Avatar>

          <div className="hidden text-left lg:block">

            <p className="text-sm font-semibold leading-none">
              {user.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {user.empresaId}
            </p>

          </div>

          <ChevronsUpDown className="h-4 w-4" />

        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        <DropdownMenuLabel>
          Minha Conta
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>

          <DropdownMenuItem>

            <User className="mr-2 h-4 w-4" />

            Perfil

          </DropdownMenuItem>

          <DropdownMenuItem>

            <Settings className="mr-2 h-4 w-4" />

            Configurações

          </DropdownMenuItem>

        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setTheme("light")}
        >
          <Sun className="mr-2 h-4 w-4" />

          Tema Claro

        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
        >
          <Moon className="mr-2 h-4 w-4" />

          Tema Escuro

        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />

          Sair

        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}