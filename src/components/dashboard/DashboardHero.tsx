"use client";

import {
  CalendarDays,
  DollarSign,
  PawPrint,
  Plus,
  Syringe,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DashboardHero() {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 text-white shadow-xl">

      <div className="relative p-10">

        {/* círculos decorativos */}

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute right-24 bottom-0 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative z-10">

          <h1 className="text-4xl font-bold">

            👋 Bom dia, Gilson

          </h1>

          <p className="mt-2 max-w-xl text-white/80">

            Bem-vindo ao PetManager.
            Acompanhe seus atendimentos,
            consultas e indicadores em tempo real.

          </p>

          {/* indicadores */}

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">

              <PawPrint className="mb-3 h-7 w-7" />

              <p className="text-sm text-white/80">
                Pets Hoje
              </p>

              <h2 className="text-3xl font-bold">
                24
              </h2>

            </div>

            <div className="rounded-xl bg-white/10 p-4">

              <CalendarDays className="mb-3 h-7 w-7" />

              <p className="text-sm text-white/80">
                Agendamentos
              </p>

              <h2 className="text-3xl font-bold">
                18
              </h2>

            </div>

            <div className="rounded-xl bg-white/10 p-4">

              <DollarSign className="mb-3 h-7 w-7" />

              <p className="text-sm text-white/80">
                Receita Hoje
              </p>

              <h2 className="text-3xl font-bold">

                R$ 2.340

              </h2>

            </div>

            <div className="rounded-xl bg-white/10 p-4">

              <Syringe className="mb-3 h-7 w-7" />

              <p className="text-sm text-white/80">
                Vacinas
              </p>

              <h2 className="text-3xl font-bold">

                5

              </h2>

            </div>

          </div>

          {/* ações */}

          <div className="mt-8 flex flex-wrap gap-3">

            <Button
              variant="secondary"
              size="lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Pet
            </Button>

            <Button
              variant="secondary"
              size="lg"
            >
              <UserRound className="mr-2 h-4 w-4" />
              Novo Tutor
            </Button>

            <Button
              variant="secondary"
              size="lg"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Agendar Banho
            </Button>

            <Button
              variant="secondary"
              size="lg"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>

          </div>

        </div>

      </div>

    </Card>
  );
}