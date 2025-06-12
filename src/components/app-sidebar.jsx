import * as React from "react"
import {
  BookOpen,
  Bot,
  Calendar1Icon,
  CalendarClockIcon,
  Command,
  Frame,
  HelpCircleIcon,
  LifeBuoy,
  Map,
  MessageSquareCodeIcon,
  PieChart,
  Repeat1Icon,
  SearchCheckIcon,
  Send,
  Settings2,
  Settings2Icon,
  ShieldCheckIcon,
  SquareTerminal,
  TrophyIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import abupic from "@/assets/abu.jpeg"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Abu Bakar",
    email: "abubakar@gmail.com",
    avatar: abupic,
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview (User stats, upcoming sessions, points)",
          url: "#",
        },
      ],
    },
    {
      title: "Skills",
    url: "#",
    icon: WrenchIcon,
    isActive: false,
    items: [
      { title: "My Offered Skills", url: "#" },
      { title: "My Needed Skills", url: "#" },
      { title: "Add New Skill", url: "#" },
    ],
    },
    {
    title: "Skill Exchange",
    url: "#",
    icon: Repeat1Icon,
    isActive: false,
    items: [
      { title: "Barter Requests", url: "#" },
      { title: "Paid Sessions", url: "#" },
      { title: "Session History", url: "#" },
    ],
  },
  {
    title: "Search & Explore",
    url: "#",
    icon: SearchCheckIcon,
    isActive: false,
    items: [
      { title: "Browse Skills", url: "#" },
      { title: "Trending Skills", url: "#" },
    ],
  },
  {
    title: "Bookings",
    url: "#",
    icon: Calendar1Icon,
    isActive: false,
    items: [
      { title: "My Schedule", url: "#" },
      { title: "Confirmed Sessions", url: "#" },
      { title: "Cancelled/Rescheduled", url: "#" },
    ],
  },
  {
    title: "Messages",
    url: "#",
    icon: MessageSquareCodeIcon,
    isActive: false,
    items: [
      { title: "Chat", url: "#" },
      { title: "Requests/Invitations", url: "#" },
    ],
  },
  {
    title: "Community",
    url: "#",
    icon: UsersIcon,
    isActive: false,
    items: [
      { title: "Forums", url: "#" },
      { title: "Testimonials", url: "#" },
      { title: "Portfolios", url: "#" },
    ],
  },
  {
    title: "Gamification",
    url: "#",
    icon: TrophyIcon,
    isActive: false,
    items: [
      { title: "Badges & Points", url: "#" },
      { title: "Leaderboard", url: "#" },
    ],
  },
  {
    title: "Events",
    url: "#",
    icon: CalendarClockIcon,
    isActive: false,
    items: [
      { title: "Upcoming Events", url: "#" },
      { title: "My Events", url: "#" },
    ],
  },
  {
    title: "Admin",
    url: "#",
    icon: ShieldCheckIcon,
    isActive: false,
    items: [
      { title: "Manage Users", url: "#" },
      { title: "Reports & Reviews", url: "#" },
      { title: "Analytics", url: "#" },
      { title: "Payment Verification", url: "#" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2Icon,
    isActive: false,
    items: [
      { title: "Profile", url: "#" },
      { title: "Privacy", url: "#" },
      { title: "Certificates", url: "#" },
    ],
  },
  {
    title: "Help & Feedback",
    url: "#",
    icon: HelpCircleIcon,
    isActive: false,
    items: [
      { title: "FAQs", url: "#" },
      { title: "Contact Support", url: "#" },
    ],
  },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Skill_Paradox</span>
                  <span className="truncate text-xs">Community_Learning</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
