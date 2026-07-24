"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const data = [
  {
    mes: "Jan",
    receita: 12000,
  },
  {
    mes: "Fev",
    receita: 18000,
  },
  {
    mes: "Mar",
    receita: 15000,
  },
  {
    mes: "Abr",
    receita: 23000,
  },
  {
    mes: "Mai",
    receita: 28000,
  },
  {
    mes: "Jun",
    receita: 32450,
  },
];


export function RevenueChart() {

  return (

    <Card className="xl:col-span-2">

      <CardHeader>

        <CardTitle>
          Receita Mensal
        </CardTitle>


        <CardDescription>
          Faturamento dos últimos 6 meses
        </CardDescription>


      </CardHeader>


      <CardContent>


        <div className="h-[350px] w-full">


          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >


              <defs>

                <linearGradient
                  id="colorReceita"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />

                </linearGradient>


              </defs>



              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />



              <XAxis
                dataKey="mes"
                axisLine={false}
                tickLine={false}
              />


              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value)=> 
                  `R$${value / 1000}k`
                }
              />



              <Tooltip
                formatter={(value)=>[
                  `R$ ${Number(value).toLocaleString(
                    "pt-BR"
                  )}`,
                  "Receita",
                ]}
              />



              <Area

                type="monotone"

                dataKey="receita"

                stroke="hsl(var(--primary))"

                fill="url(#colorReceita)"

                strokeWidth={3}

              />


            </AreaChart>


          </ResponsiveContainer>


        </div>


      </CardContent>


    </Card>

  );

}