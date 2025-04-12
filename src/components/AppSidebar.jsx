"use client";

import * as React from "react";
import {
  Command,
  Settings2,
  HomeIcon,
  HistoryIcon,
  CirclePlusIcon,
  LineChartIcon,
  TrendingUpIcon,
} from "lucide-react";

import { NavMain } from "@/components/sidebar_component/nav-main";
import { NavUser } from "@/components/sidebar_component/nav-user";
import { TeamSwitcher } from "@/components/sidebar_component/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useAuthContext } from "@/context/authenticationContext";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "AI Article Generator",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: {
    navigation: [
      {
        title: "Home",
        url: "",
        icon: HomeIcon,
        isActive: true,
      },
      {
        title: "History",
        url: "/history",
        icon: HistoryIcon,
        isActive: true,
      },
      {
        title: "Keywords Research",
        url: "/keywords-research",
        icon: TrendingUpIcon,
        isActive: true,
      },
    ],
    action: [
      {
        title: "Create Article",
        url: "/create-article",
        icon: CirclePlusIcon,
        isActive: false,
      },
    ],
  },
};

export default function AppSidebar({ ...props }) {
  const { session, signOut } = useAuthContext();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user?.user_metadata} signOut={signOut} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
