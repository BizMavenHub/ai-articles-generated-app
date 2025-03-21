"use client";

import * as React from "react";
import { Command, Settings2, SquareTerminal } from "lucide-react";

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
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "History",
        url: "/history",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "SEO Checker",
        url: "/seo-checker",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Keywords Research",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        isActive: false,
      },
    ],
    action: [
      {
        title: "Create Article",
        url: "/create-article",
        icon: SquareTerminal,
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
