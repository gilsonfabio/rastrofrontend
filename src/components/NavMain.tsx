"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  icon: LucideIcon
}

type NavGroup = {
  title: string
  url?: string
  icon?: LucideIcon
  items?: NavItem[]
}

interface NavMainProps {
  items: NavGroup[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()

  return (
    <>
      {items.map((item) => {
        // Item simples (Dashboard)
        if (!item.items) {
          const Icon = item.icon!

          return (
            <SidebarGroup key={item.title}>
              <SidebarGroupContent>

                <SidebarMenu>

                  <SidebarMenuItem>

                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url!}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                  </SidebarMenuItem>

                </SidebarMenu>

              </SidebarGroupContent>
            </SidebarGroup>
          )
        }

        // Grupo (Cadastros, Agenda...)
        const isOpen = item.items.some((sub) =>
          pathname.startsWith(sub.url)
        )

        return (
          <SidebarGroup key={item.title}>

            <SidebarGroupLabel>
              {item.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>

              <Collapsible
                defaultOpen={isOpen}
                className="group/collapsible"
              >
                <SidebarMenu>

                  <SidebarMenuItem>

                    <CollapsibleTrigger asChild>

                      <SidebarMenuButton>

                        <span>{item.title}</span>

                        <ChevronRight
                          className="
                            ml-auto
                            h-4
                            w-4
                            transition-transform
                            duration-200
                            group-data-[state=open]/collapsible:rotate-90
                          "
                        />

                      </SidebarMenuButton>

                    </CollapsibleTrigger>

                    <CollapsibleContent>

                      <SidebarMenuSub>

                        {item.items.map((sub) => {
                          const Icon = sub.icon

                          return (
                            <SidebarMenuSubItem key={sub.url}>

                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === sub.url}
                              >
                                <Link href={sub.url}>

                                  <Icon className="mr-2 h-4 w-4" />

                                  <span>{sub.title}</span>

                                </Link>

                              </SidebarMenuSubButton>

                            </SidebarMenuSubItem>
                          )
                        })}

                      </SidebarMenuSub>

                    </CollapsibleContent>

                  </SidebarMenuItem>

                </SidebarMenu>

              </Collapsible>

            </SidebarGroupContent>

          </SidebarGroup>
        )
      })}
    </>
  )
}