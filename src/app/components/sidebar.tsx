import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
export default function sidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="pl-5">
            <Link href="/home">
              <HomeIcon className="w-4 h-4" />
              <span className="text-sm font-medium text-sidebar-foreground">
                Home
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  );
}
