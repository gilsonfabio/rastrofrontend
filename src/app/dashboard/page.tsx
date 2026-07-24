import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AgendaHoje } from "@/components/dashboard/AgendaHoje";
import { VacinasCard } from "@/components/dashboard/VacinasCard";
import { EstoqueCard } from "@/components/dashboard/EstoqueCard";
import { FinanceiroCard } from "@/components/dashboard/FinanceiroCard";


export default function DashboardPage(){
  return (
    <div className="space-y-6">
      <DashboardHero />
      <QuickActions />
      <StatsCards />
      <div className="grid gap-6 xl:grid-cols-3">
        <RevenueChart />
        <AgendaHoje />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <VacinasCard />
        <EstoqueCard />
      </div>
      <FinanceiroCard />
    </div>
  );
}