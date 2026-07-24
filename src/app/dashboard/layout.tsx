import { ReactNode } from "react";

import {
  SidebarProvider,
} from "@/components/ui/sidebar";

import {
  AppSidebar,
} from "@/components/app-sidebar";

import {
  SiteHeader,
} from "@/components/site-header";


interface DashboardLayoutProps {
  children: ReactNode;
}


export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {


  return (

    <SidebarProvider>


      <AppSidebar />


      <main
        className="
          flex
          min-h-screen
          flex-1
          flex-col
        "
      >


        <SiteHeader />


        <div
          className="
            flex-1
            p-4
            md:p-6
          "
        >

          {children}

        </div>


      </main>


    </SidebarProvider>

  );

}