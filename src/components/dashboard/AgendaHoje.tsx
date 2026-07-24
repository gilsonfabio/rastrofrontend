"use client";

import {
  CalendarClock,
  CheckCircle2,
  Clock,
  PawPrint,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const agenda = [
  {
    horario: "09:00",
    pet: "Thor",
    tutor: "Carlos Silva",
    servico: "Banho e Tosa",
    status: "Confirmado",
  },

  {
    horario: "10:30",
    pet: "Luna",
    tutor: "Mariana Souza",
    servico: "Consulta Veterinária",
    status: "Aguardando",
  },

  {
    horario: "13:00",
    pet: "Mel",
    tutor: "João Oliveira",
    servico: "Vacinação",
    status: "Confirmado",
  },

  {
    horario: "15:30",
    pet: "Max",
    tutor: "Ana Paula",
    servico: "Banho",
    status: "Agendado",
  },
];


export function AgendaHoje(){

  return (

    <Card>


      <CardHeader>


        <div className="flex items-center justify-between">


          <div>

            <CardTitle>
              Agenda de Hoje
            </CardTitle>


            <CardDescription>
              Próximos atendimentos
            </CardDescription>


          </div>



          <CalendarClock
            className="h-6 w-6 text-primary"
          />


        </div>


      </CardHeader>



      <CardContent>


        <div className="space-y-5">


          {agenda.map((item)=>(
            

            <div

              key={`${item.horario}-${item.pet}`}

              className="
                relative
                flex
                gap-4
                rounded-xl
                border
                p-4
                transition
                hover:bg-muted/50
              "

            >


              {/* horário */}


              <div
                className="
                  flex
                  w-16
                  flex-col
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary/10
                "
              >

                <Clock
                  className="mb-1 h-4 w-4 text-primary"
                />

                <span
                  className="text-sm font-bold"
                >
                  {item.horario}
                </span>


              </div>




              {/* informações */}


              <div className="flex-1">


                <div className="flex items-center gap-2">


                  <PawPrint
                    className="h-4 w-4 text-primary"
                  />


                  <h3
                    className="font-semibold"
                  >
                    {item.pet}
                  </h3>


                </div>



                <p
                  className="
                    mt-1
                    text-sm
                    text-muted-foreground
                  "
                >

                  Tutor: {item.tutor}

                </p>



                <p
                  className="
                    mt-1
                    text-sm
                  "
                >

                  {item.servico}

                </p>


              </div>




              {/* status */}


              <div>


                <div
                  className={`
                    flex
                    items-center
                    gap-1
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium

                    ${
                      item.status === "Confirmado"
                      ?
                      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      :
                      item.status === "Aguardando"
                      ?
                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }
                  `}
                >

                  <CheckCircle2
                    className="h-3 w-3"
                  />


                  {item.status}


                </div>


              </div>



            </div>


          ))}


        </div>


      </CardContent>


    </Card>

  );

}