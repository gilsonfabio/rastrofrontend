"use client";

import {
  AlertTriangle,
  CalendarDays,
  Syringe,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const vacinas = [
  {
    pet: "Thor",
    vacina: "Antirrábica",
    vencimento: "vence em 5 dias",
  },
  {
    pet: "Luna",
    vacina: "V8",
    vencimento: "vence em 10 dias",
  },
  {
    pet: "Mel",
    vacina: "Giárdia",
    vencimento: "vence em 15 dias",
  },
];


export function VacinasCard() {

  return (

    <Card>

      <CardHeader>

        <div className="flex items-center justify-between">

          <div>

            <CardTitle className="flex items-center gap-2">

              <Syringe className="h-5 w-5 text-primary" />

              Vacinas

            </CardTitle>


            <CardDescription>
              Próximos vencimentos
            </CardDescription>

          </div>


          <div className="
            rounded-full
            bg-yellow-100
            p-3
            dark:bg-yellow-900
          ">

            <AlertTriangle
              className="
                h-5
                w-5
                text-yellow-600
                dark:text-yellow-300
              "
            />

          </div>


        </div>


      </CardHeader>


      <CardContent>


        <div className="space-y-4">


          {vacinas.map((item)=> (

            <div
              key={item.pet}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                p-3
                transition
                hover:bg-muted/50
              "
            >

              <div>


                <p className="font-semibold">
                  🐾 {item.pet}
                </p>


                <p className="
                  text-sm
                  text-muted-foreground
                ">
                  {item.vacina}
                </p>


              </div>



              <div className="
                flex
                items-center
                gap-1
                text-xs
                text-yellow-600
              ">

                <CalendarDays
                  className="h-3 w-3"
                />

                {item.vencimento}

              </div>


            </div>


          ))}


        </div>


      </CardContent>


    </Card>

  );
}