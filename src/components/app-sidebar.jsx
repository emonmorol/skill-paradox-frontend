import * as React from "react";
import {
	BookOpen,
	Bot,
	Calendar1Icon,
	CalendarClockIcon,
	Command,
	Frame,
	HelpCircleIcon,
	Home,
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
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import abupic from "@/assets/abu.jpeg";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
	user: {
		name: "Abu Bakar",
		email: "abubakar@gmail.com",
		avatar: abupic,
	},
	navMain: [
		{
			title: "Dashboard",
			icon: SquareTerminal,
			items: [
				{
					title: "Overview",
					url: "/test",
				},
			],
		},
		{
			title: "Skills",
			icon: WrenchIcon,
			items: [
				{ title: "My Offered Skills", url: "/offered" },
				{ title: "My Needed Skills", url: "#" },
				{ title: "Add New Skill", url: "/addnewskill" },
			],
		},
		{
			title: "Skill Exchange",
			icon: Repeat1Icon,
			items: [
				{ title: "Barter Requests", url: "/barterrequest" },
				{ title: "Paid Sessions", url: "paidsession" },
				{ title: "Session History", url: "sessionhistory" },
			],
		},
		{
			title: "Search & Explore",
			icon: SearchCheckIcon,
			items: [
				{ title: "Browse Skills", url: "#" },
				{ title: "Trending Skills", url: "#" },
			],
		},
		{
			title: "Bookings",
			icon: Calendar1Icon,
			items: [
				{ title: "My Schedule", url: "#" },
				{ title: "Confirmed Sessions", url: "#" },
				{ title: "Cancelled/Rescheduled", url: "#" },
			],
		},
		{
			title: "Messages",
			icon: MessageSquareCodeIcon,
			items: [
				{ title: "Chat", url: "#" },
				{ title: "Requests/Invitations", url: "#" },
			],
		},
		{
			title: "Community",
			icon: UsersIcon,
			items: [
				{ title: "Forums", url: "#" },
				{ title: "Testimonials", url: "#" },
				{ title: "Portfolios", url: "#" },
			],
		},
		{
			title: "Gamification",
			icon: TrophyIcon,
			items: [
				{ title: "Badges & Points", url: "#" },
				{ title: "Leaderboard", url: "#" },
			],
		},
		{
			title: "Events",
			icon: CalendarClockIcon,
			items: [
				{ title: "Upcoming Events", url: "#" },
				{ title: "My Events", url: "#" },
			],
		},
		{
			title: "Admin",
			icon: ShieldCheckIcon,
			items: [
				{ title: "Manage Users", url: "#" },
				{ title: "Reports & Reviews", url: "#" },
				{ title: "Analytics", url: "#" },
				{ title: "Payment Verification", url: "#" },
			],
		},
		{
			title: "Settings",
			icon: Settings2Icon,
			items: [
				{ title: "Profile", url: "#" },
				{ title: "Privacy", url: "#" },
				{ title: "Certificates", url: "#" },
			],
		},
		{
			title: "Help & Feedback",
			icon: HelpCircleIcon,
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
			name: "Home",
			url: "/",
			isActive: true,
			icon: Home,
		},
	],
};

export function AppSidebar({ ...props }) {
	return (
		<Sidebar
			className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										Skill_Paradox
									</span>
									<span className="truncate text-xs">
										Community_Learning
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavProjects projects={data.projects} />
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
