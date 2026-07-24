"use client";

import {
  PawPrint,
  Users,
  CalendarDays,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";


const stats = [
  {
    title: "Total de Pets",
    value: "1.245",
    description: "+12% este mês",
    icon: PawPrint,
  },

  {
    title: "Tutores",
    value: "865",
    description: "+8% este mês",
    icon: Users,
  },

  {
    title: "Consultas",
    value: "142",
    description: "+18% este mês",
    icon: CalendarDays,
  },

  {
    title: "Receita",
    value: "R$ 32.450",
    description: "+21% este mês",
    icon: DollarSign,
  },
];


export function StatsCards() {

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">


      {stats.map((item) => {


        const Icon = item.icon;


        return (

          <Card
            key={item.title}
            className="
              group
              transition-all
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <CardContent className="p-6">


              <div className="flex items-center justify-between">


                <div>


                  <p className="text-sm text-muted-foreground">

                    {item.title}

                  </p>



                  <h2 className="mt-2 text-3xl font-bold">

                    {item.value}

                  </h2>



                  <div className="mt-3 flex items-center gap-1 text-sm text-green-600">


                    <TrendingUp
                      className="h-4 w-4"
                    />


                    {item.description}


                  </div>


                </div>




                <div
                  className="
                    rounded-xl
                    bg-primary/10
                    p-4
                    transition
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >

                  <Icon
                    className="
                      h-7
                      w-7
                      text-primary
                      group-hover:text-white
                    "
                  />


                </div>


              </div>


            </CardContent>


          </Card>

        )

      })}


    </div>

  );

}