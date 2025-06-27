import React from "react";
import { MoreVertical, BadgeCheck, XCircle } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ExchangeHistoryList({
	history = [],
	onAction = () => {},
}) {
	return (
		<div className="w-full space-y-4">
			{history.map((item) => (
				<div
					key={item.id}
					className="flex items-center justify-between gap-4 p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
				>
					{/* Info Section */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
						<div>
							<p className="font-semibold text-sm text-gray-800 truncate">
								{item.title}
							</p>
							<p className="text-xs text-muted-foreground">
								{item.skill} • {item.category}
							</p>
						</div>
						<Badge
							variant="outline"
							className={`ml-0 sm:ml-2 mt-2 sm:mt-0 text-xs px-2 py-1 uppercase font-medium ${
								item.status === "accepted"
									? "border-green-500 text-green-600"
									: item.status === "rejected"
									? "border-red-500 text-red-600"
									: "border-gray-300 text-gray-600"
							}`}
						>
							{item.status}
						</Badge>
					</div>

					{/* Action Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full"
							>
								<MoreVertical className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={() => onAction("view", item)}
							>
								View Details
							</DropdownMenuItem>
							{item.status === "pending" && (
								<>
									<DropdownMenuItem
										onClick={() => onAction("accept", item)}
									>
										Accept
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => onAction("reject", item)}
									>
										Reject
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			))}
		</div>
	);
} // Sample usage:
// <ExchangeHistoryList
//   history={historyData}
//   onAction={(action, item) => console.log(action, item)}
// />
