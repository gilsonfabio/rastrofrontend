"use client";

import {
  CalendarPlus,
  ClipboardPlus,
  Dog,
  PackagePlus,
  ShoppingCart,
  UserPlus,
} from "lucide-react";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const actions = [
  {
    title: "Novo Pet",
    description: "Cadastrar animal",
    icon: Dog,
    href: "/dashboard/pets/novo",
  },

  {
    title: "Novo Tutor",
    description: "Cadastrar cliente",
    icon: UserPlus,
    href: "/dashboard/tutores/novo",
  },

  {
    title: "Banho e Tosa",
    description: "Novo agendamento",
    icon: CalendarPlus,
    href: "/dashboard/banho-tosa/novo",
  },

  {
    title: "Consulta",
    description: "Agendar atendimento",
    icon: ClipboardPlus,
    href: "/dashboard/consultas/novo",
  },

  {
    title: "Nova Venda",
    description: "Registrar venda",
    icon: ShoppingCart,
    href: "/dashboard/vendas/nova",
  },

  {
    title: "Estoque",
    description: "Entrada produto",
    icon: PackagePlus,
    href: "/dashboard/estoque/entrada",
  },
];


export function QuickActions() {


  return (

    <Card>


      <CardHeader>

        <CardTitle>
          Ações Rápidas
        </CardTitle>

      </CardHeader>



      <CardContent>


        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-6
          "
        >


          {actions.map((action)=>{


            const Icon = action.icon;


            return (

              <Link
                key={action.title}
                href={action.href}
              >

                <div
                  className="
                    group
                    cursor-pointer
                    rounded-xl
                    border
                    p-4
                    transition-all
                    hover:-translate-y-1
                    hover:border-primary
                    hover:shadow-md
                  "
                >

                  <div
                    className="
                      mb-3
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                      transition
                      group-hover:bg-primary
                    "
                  >

                    <Icon
                      className="
                        h-6
                        w-6
                        text-primary
                        transition
                        group-hover:text-primary-foreground
                      "
                    />

                  </div>



                  <h3
                    className="
                      font-semibold
                    "
                  >

                    {action.title}

                  </h3>



                  <p
                    className="
                      mt-1
                      text-xs
                      text-muted-foreground
                    "
                  >

                    {action.description}

                  </p>


                </div>


              </Link>

            );

          })}


        </div>


      </CardContent>


    </Card>

  );

}