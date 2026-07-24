"use client"

import * as React from "react"

import {
  LayoutDashboard,
  Dna,
  PawPrint,
  Dog,
  Users,
  Scissors,
  Stethoscope,
  Syringe,
  Package,
  DollarSign,
  Building2,
  UserCog,
  Settings,
} from "lucide-react"

import { NavMain } from "@/components/NavMain"
import { NavUser } from "@/components/NavUser"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Gilson Fabio",
    email: "admin@petmanager.com",
    avatar: "",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Cadastros",
      items: [
        {
          title: "Espécies",
          url: "/dashboard/especies",
          icon: Dna,
        },
        {
          title: "Raças",
          url: "/dashboard/racas",
          icon: PawPrint,
        },
        {
          title: "Pets",
          url: "/dashboard/pets",
          icon: Dog,
        },
        {
          title: "Tutores",
          url: "/dashboard/tutores",
          icon: Users,
        },
      ],
    },

    {
      title: "Agenda",
      items: [
        {
          title: "Banho e Tosa",
          url: "/dashboard/banho-tosa",
          icon: Scissors,
        },
        {
          title: "Consultas",
          url: "/dashboard/consultas",
          icon: Stethoscope,
        },
      ],
    },

    {
      title: "Saúde",
      items: [
        {
          title: "Vacinas",
          url: "/dashboard/vacinas",
          icon: Syringe,
        },
      ],
    },

    {
      title: "Estoque",
      items: [
        {
          title: "Produtos",
          url: "/dashboard/estoque",
          icon: Package,
        },
      ],
    },

    {
      title: "Financeiro",
      items: [
        {
          title: "Financeiro",
          url: "/dashboard/financeiro",
          icon: DollarSign,
        },
      ],
    },

    {
      title: "Administração",
      items: [
        {
          title: "Empresa",
          url: "/dashboard/empresa",
          icon: Building2,
        },
        {
          title: "Usuários",
          url: "/dashboard/usuarios",
          icon: UserCog,
        },
        {
          title: "Configurações",
          url: "/dashboard/configuracoes",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      {...props}
    >
      <SidebarHeader>

        <div className="flex items-center gap-3 px-2 py-2">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">

            🐾

          </div>

          <div className="flex flex-col">

            <span className="font-bold">
              PetManager
            </span>

            <span className="text-xs text-muted-foreground">
              Gestão Inteligente
            </span>

          </div>

        </div>

      </SidebarHeader>

      <SidebarContent>

        <NavMain items={data.navMain} />

      </SidebarContent>

      <SidebarFooter>

        <NavUser user={data.user} />

      </SidebarFooter>

      <SidebarRail />

    </Sidebar>
  )
}