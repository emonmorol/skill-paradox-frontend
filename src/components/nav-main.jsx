"use client";

import { ChevronRight } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

export function NavMain({ items }) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible key={item.title} asChild>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton asChild tooltip={item.title}>
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-2 flex-1 cursor-pointer">
											<item.icon />
											<span>{item.title}</span>
										</div>
										{item.items?.length ? (
											<ChevronRight className="transition-transform data-[state=open]:rotate-90" />
										) : null}
									</div>
								</SidebarMenuButton>
							</CollapsibleTrigger>

							{item.items?.length ? (
								<CollapsibleContent>
									<SidebarMenuSub>
										{item.items.map((subItem) => (
											<SidebarMenuSubItem
												key={subItem.title}
											>
												<SidebarMenuSubButton asChild>
													<NavLink to={subItem.url}>
														<span>
															{subItem.title}
														</span>
													</NavLink>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							) : null}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
