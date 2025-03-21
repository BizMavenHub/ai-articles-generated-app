"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.navigation.map((item) => (
          <SidebarMenuItem key={item.title} className="cursor-pointer">
            <SidebarMenuButton asChild>
              <a href={"/dashboard" + item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <br />
      <SidebarGroupLabel>Action</SidebarGroupLabel>
      <SidebarMenu>
        {items.action.map((item) => (
          <SidebarMenuItem key={item.title} className="cursor-pointer ">
            <SidebarMenuButton asChild>
              <a href={"/dashboard" + item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
