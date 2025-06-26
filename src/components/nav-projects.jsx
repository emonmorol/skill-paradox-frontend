import { Folder, MoreHorizontal, Share, Trash2 } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

export function NavProjects({ projects }) {
	const { isMobile } = useSidebar();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem
						key={item.name}
						defaultOpen={item.isActive}
					>
						<SidebarMenuButton asChild>
							<NavLink to={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</NavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
