"use client";


import {
  AlertCircle,
  Package,
  ShoppingCart,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const produtos = [
  {
    nome: "Shampoo Pet",
    quantidade: 3,
  },

  {
    nome: "Ração Premium",
    quantidade: 5,
  },

  {
    nome: "Tapete Higiênico",
    quantidade: 8,
  },

];


export function EstoqueCard() {


  return (

    <Card>


      <CardHeader>


        <div className="flex items-center justify-between">


          <div>


            <CardTitle className="flex items-center gap-2">


              <Package
                className="h-5 w-5 text-primary"
              />


              Estoque


            </CardTitle>


            <CardDescription>

              Produtos abaixo do mínimo

            </CardDescription>


          </div>



          <div
            className="
              rounded-full
              bg-red-100
              p-3
              dark:bg-red-900
            "
          >

            <AlertCircle
              className="
                h-5
                w-5
                text-red-600
                dark:text-red-300
              "
            />


          </div>


        </div>


      </CardHeader>



      <CardContent>


        <div className="space-y-4">


          {produtos.map((produto)=>(


            <div

              key={produto.nome}

              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                p-3
                hover:bg-muted/50
              "

            >


              <div className="flex items-center gap-3">


                <ShoppingCart
                  className="
                    h-4
                    w-4
                    text-muted-foreground
                  "
                />


                <div>


                  <p className="font-medium">

                    {produto.nome}

                  </p>


                  <p className="
                    text-xs
                    text-muted-foreground
                  ">

                    Estoque atual

                  </p>


                </div>


              </div>



              <span
                className="
                  rounded-full
                  bg-red-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-red-700
                  dark:bg-red-900
                  dark:text-red-300
                "
              >

                {produto.quantidade} un.

              </span>


            </div>


          ))}


        </div>


      </CardContent>


    </Card>

  );

}