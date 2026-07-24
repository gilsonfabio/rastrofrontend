import {
  LayoutDashboard,
  PawPrint,
  Dna,
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
  LucideIcon,
} from "lucide-react";

export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const menu: MenuGroup[] = [
  {
    title: "GERAL",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "CADASTROS",
    items: [
      {
        title: "Espécies",
        href: "/dashboard/especies",
        icon: Dna,
      },
      {
        title: "Raças",
        href: "/dashboard/racas",
        icon: PawPrint,
      },
      {
        title: "Pets",
        href: "/dashboard/pets",
        icon: Dog,
      },
      {
        title: "Tutores",
        href: "/dashboard/tutores",
        icon: Users,
      },
    ],
  },

  {
    title: "AGENDA",
    items: [
      {
        title: "Banho e Tosa",
        href: "/dashboard/banho-tosa",
        icon: Scissors,
      },
      {
        title: "Consultas",
        href: "/dashboard/consultas",
        icon: Stethoscope,
      },
    ],
  },

  {
    title: "SAÚDE",
    items: [
      {
        title: "Vacinas",
        href: "/dashboard/vacinas",
        icon: Syringe,
        badge: 8,
      },
    ],
  },

  {
    title: "ESTOQUE",
    items: [
      {
        title: "Produtos",
        href: "/dashboard/estoque",
        icon: Package,
      },
    ],
  },

  {
    title: "FINANCEIRO",
    items: [
      {
        title: "Financeiro",
        href: "/dashboard/financeiro",
        icon: DollarSign,
      },
    ],
  },

  {
    title: "ADMINISTRAÇÃO",
    items: [
      {
        title: "Empresa",
        href: "/dashboard/empresa",
        icon: Building2,
      },
      {
        title: "Usuários",
        href: "/dashboard/usuarios",
        icon: UserCog,
      },
      {
        title: "Configurações",
        href: "/dashboard/configuracoes",
        icon: Settings,
      },
    ],
  },
];