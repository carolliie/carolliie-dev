"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  ComputerIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMidias } from "./nav-midias"

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Análise geral",
          url: "/dashboard",
        },
        {
          title: "Usuários",
          url: "#",
        },
        {
          title: "Visualizações",
          url: "#",
        },
      ],
    },
    {
      title: "Publicações",
      url: "/dashboard/posts",
      icon: Bot,
      items: [
        {
          title: "Todas as publicações",
          url: "/dashboard/posts",
        },
        {
          title: "Nova publicação",
          url: "/dashboard/posts/novo-post",
        },
        {
          title: "Categorias",
          url: "/dashboard",
        },
        {
          title: "Comentários",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Configurações",
      url: "/dashboard",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard",
        },
        {
          title: "Team",
          url: "/dashboard",
        },
        {
          title: "Billing",
          url: "/dashboard",
        },
        {
          title: "Limits",
          url: "/dashboard",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Projetos",
      url: "/dashboard/projetos",
      icon: ComputerIcon,
      items: [
        {
          title: "Todos os projetos",
          url: "/dashboard/projetos",
        },
        {
          title: "Novo projeto",
          url: "/dashboard/projetos/novo-projeto",
        },
        {
          title: "Categorias",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Configurações",
      url: "/dashboard",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard",
        },
        {
          title: "Team",
          url: "/dashboard",
        },
        {
          title: "Billing",
          url: "/dashboard",
        },
        {
          title: "Limits",
          url: "/dashboard",
        },
      ],
    },
  ],
  midias: [
    {
      title: "Biblioteca de mídia",
      url: "/dashboard",
      icon: BookOpen,
      items: [
        {
          title: "Todos as mídias",
          url: "/dashboard",
        },
        {
          title: "Mídias de publicações",
          url: "/dashboard",
        },
        {
          title: "Mídias de projetos",
          url: "/dashboard",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavMidias midias={data.midias}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
