"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Bell,
  Plus,
  Search,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { ThemeSwitcher } from "@/components/theme-switcher"

import { NavUser } from "@/components/NavUser"

const user = {
  name: "Gilson Fabio",
  email: "admin@petmanager.com",
  avatar: "",
}

export function SiteHeader() {
  const pathname = usePathname()

  const paths = pathname
    .split("/")
    .filter(Boolean)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">

      <div className="flex h-16 items-center justify-between px-6">

        {/* ESQUERDA */}

        <div className="flex items-center gap-6">

          <SidebarTrigger />

          <Breadcrumb>

            <BreadcrumbList>

              {paths.map((item, index) => {
                const href =
                  "/" + paths.slice(0, index + 1).join("/")

                const label =
                  item.charAt(0).toUpperCase() +
                  item.slice(1).replace("-", " ")

                return (
                  <div
                    key={href}
                    className="flex items-center"
                  >
                    {index > 0 && (
                      <BreadcrumbSeparator />
                    )}

                    <BreadcrumbItem>

                      {index === paths.length - 1 ? (
                        <BreadcrumbPage>
                          {label}
                        </BreadcrumbPage>
                      ) : (
                        <Link href={href}>
                          {label}
                        </Link>
                      )}

                    </BreadcrumbItem>

                  </div>
                )
              })}

            </BreadcrumbList>

          </Breadcrumb>

        </div>

        {/* DIREITA */}

        <div className="flex items-center gap-3">

          <div className="relative hidden lg:block">

            <Search
              className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
            />

            <Input
              placeholder="Pesquisar..."
              className="w-72 pl-9"
            />

          </div>

          <Button>

            <Plus className="mr-2 h-4 w-4" />

            Novo

          </Button>

          <Button
            variant="ghost"
            size="icon"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <ThemeSwitcher />

          <NavUser user={user} />

        </div>

      </div>

    </header>
  )
}