"use client";


import {
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  Wallet,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const movimentacoes = [
  {
    descricao: "Banho e Tosa - Thor",
    valor: "+ R$ 120,00",
    tipo: "entrada",
  },

  {
    descricao: "Consulta Veterinária - Luna",
    valor: "+ R$ 180,00",
    tipo: "entrada",
  },

  {
    descricao: "Compra de Produtos",
    valor: "- R$ 650,00",
    tipo: "saida",
  },

];


export function FinanceiroCard() {


  return (

    <Card className="xl:col-span-2">


      <CardHeader>


        <div className="flex items-center justify-between">


          <div>


            <CardTitle className="flex items-center gap-2">

              <Wallet
                className="h-5 w-5 text-primary"
              />

              Financeiro


            </CardTitle>


            <CardDescription>

              Resumo financeiro do período

            </CardDescription>


          </div>



          <DollarSign
            className="h-7 w-7 text-primary"
          />


        </div>


      </CardHeader>




      <CardContent>


        {/* indicadores financeiros */}


        <div className="
          grid
          gap-4
          md:grid-cols-3
        ">


          <div
            className="
              rounded-xl
              bg-green-50
              p-4
              dark:bg-green-950
            "
          >

            <p className="
              text-sm
              text-muted-foreground
            ">

              Receita Hoje

            </p>


            <h3 className="
              mt-2
              text-2xl
              font-bold
            ">

              R$ 2.340

            </h3>


          </div>




          <div
            className="
              rounded-xl
              bg-red-50
              p-4
              dark:bg-red-950
            "
          >

            <p className="
              text-sm
              text-muted-foreground
            ">

              Despesas

            </p>


            <h3 className="
              mt-2
              text-2xl
              font-bold
            ">

              R$ 650

            </h3>


          </div>




          <div
            className="
              rounded-xl
              bg-primary/10
              p-4
            "
          >

            <p className="
              text-sm
              text-muted-foreground
            ">

              Lucro

            </p>


            <h3 className="
              mt-2
              text-2xl
              font-bold
            ">

              R$ 1.690

            </h3>


          </div>


        </div>



        {/* movimentações */}


        <div className="mt-6 space-y-3">


          <h3 className="
            font-semibold
          ">

            Últimas movimentações

          </h3>



          {movimentacoes.map((item)=>(


            <div

              key={item.descricao}

              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                p-3
              "

            >


              <div className="
                flex
                items-center
                gap-3
              ">


                {
                  item.tipo === "entrada"
                  ?

                  <ArrowUpCircle
                    className="
                      h-5
                      w-5
                      text-green-600
                    "
                  />

                  :

                  <ArrowDownCircle
                    className="
                      h-5
                      w-5
                      text-red-600
                    "
                  />

                }


                <span>

                  {item.descricao}

                </span>


              </div>




              <span
                className={`
                  font-semibold

                  ${
                    item.tipo === "entrada"
                    ?
                    "text-green-600"
                    :
                    "text-red-600"
                  }

                `}
              >

                {item.valor}

              </span>


            </div>


          ))}


        </div>


      </CardContent>


    </Card>

  );

}