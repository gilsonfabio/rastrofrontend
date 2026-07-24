"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Especie } from "@/services/especies";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EspecieColumnsProps {
  onDelete: (especie: Especie) => void;
  onSuccess: () => void;
}

export function especieColumns({
  onDelete,
  onSuccess,
}: EspecieColumnsProps): ColumnDef<Especie>[]  {
  return [
    {
      accessorKey: "espId",
      header: "Código",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.espId}
        </span>
      ),
    },

    {
      accessorKey: "espNome",
      header: "Espécie",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.espNome}
        </span>
      ),
    },

    {
      id: "acoes",
      header: "",
      enableSorting: false,

      cell: ({ row }) => {
        const especie = row.original;

        return (
          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <Button
                variant="ghost"
                size="icon"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <DropdownMenuItem asChild>

                <Link
                  href={`/dashboard/especies/${especie.espId}/editar`}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Link>

              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onDelete(especie)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>
        );
      },
    },
  ];
}