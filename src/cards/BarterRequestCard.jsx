import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	Calendar,
	Clock,
	Repeat2,
	MoreVertical,
	Tag,
	Layers,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function BarterRequestCard({
	id,
	status,
	request_time,
	pricing_type,
	requester,
	target_listing,
	offered_listing,
	isIncoming,
	onChat = () => alert("Opening chat..."),
	onViewProfile = () => alert("Viewing profile..."),
	onReport = () => alert("Reported."),
}) {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [nStatus, setNStatus] = useState(status);
	const { user } = useAuth();

	useEffect(() => {
		const card = document.querySelector(".barter-card");
		if (card) {
			card.classList.add("fade-in");
		}
	}, []);

	const formattedDate = new Date(request_time).toLocaleDateString();
	const formattedTime = new Date(request_time).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	const statusColor = {
		pending: "bg-yellow-100 text-yellow-800",
		accepted: "bg-green-100 text-green-800",
		rejected: "bg-red-100 text-red-800",
		completed: "bg-gray-200 text-gray-800",
	};

	const handleAction = async (actionName) => {
		setIsLoading(true);
		try {
			// console.log({
			// 	id: id,
			// 	action: actionName,
			// });
			await axiosInstance.patch(`/barter/response`, {
				id: id,
				action: actionName,
			});
			setNStatus(actionName);
			Swal.fire({
				icon: "success",
				title: `${actionName.charAt(0).toUpperCase() + actionName.slice(1)} succeeded`,
				text: `for "${target_listing?.title}"`,
				timer: 1800,
				showConfirmButton: false,
			});
		} catch (err) {
			Swal.fire({
				icon: "error",
				title: `${actionName.charAt(0).toUpperCase() + actionName.slice(1)} failed`,
				text: err.message,
			});
		}
		setIsLoading(false);
	};

	return (
		<Card className="barter-card w-full max-w-md rounded-3xl bg-white p-0 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl overflow-hidden">
			<CardHeader className="flex flex-col gap-3 p-5 relative">
				{/* Dropdown menu */}
				<div className="absolute top-5 right-5 z-20">
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
							<DropdownMenuItem onClick={onChat}>
								Chat
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onViewProfile}>
								View Profile
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onReport}>
								Report
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<Badge
					className="w-fit flex items-center gap-1 uppercase tracking-wide font-semibold text-xs"
					variant={isIncoming ? "secondary" : "default"}
				>
					<Repeat2 className="w-4 h-4" />
					{isIncoming ? "Incoming Request" : "Your Request"}
				</Badge>

				<CardTitle className="text-2xl font-extrabold leading-tight">
					Trade Request
				</CardTitle>

				{/* Dual Listing */}
				<div className="flex flex-wrap sm:flex-row gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
					{/* Offered Listing */}
					<div className="flex-1 bg-white shadow-sm rounded-lg p-4 flex flex-col gap-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
						<p className="text-xs font-semibold uppercase text-indigo-600 tracking-wide">
							Offered Listing
						</p>
						<h3
							className="text-lg font-bold text-gray-900 truncate"
							title={offered_listing?.title}
						>
							{offered_listing?.title}
						</h3>
						<div className="flex items-center gap-3 text-gray-600">
							<Tag className="w-4 h-4 text-indigo-400" />
							<span className="font-medium">
								{offered_listing?.skill?.name}
							</span>
						</div>
						<div className="flex items-center gap-3 text-gray-400 text-sm">
							<Layers className="w-3.5 h-3.5" />
							<span>{offered_listing?.skill?.category}</span>
						</div>

						{/* View Details Button */}
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								navigate(`/listing/${offered_listing.id}`)
							}
							className="self-start"
						>
							View Details
						</Button>
					</div>

					{/* Requested Listing */}
					<div className="flex-1 bg-white shadow-sm rounded-lg p-4 flex flex-col gap-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
						<p className="text-xs font-semibold uppercase text-emerald-600 tracking-wide">
							Requested Listing
						</p>
						<h3
							className="text-lg font-bold text-gray-900 truncate"
							title={target_listing?.title}
						>
							{target_listing?.title}
						</h3>
						<div className="flex items-center gap-3 text-gray-600">
							<Tag className="w-4 h-4 text-emerald-400" />
							<span className="font-medium">
								{target_listing?.skill?.name}
							</span>
						</div>
						<div className="flex items-center gap-3 text-gray-400 text-sm">
							<Layers className="w-3.5 h-3.5" />
							<span>{target_listing?.skill?.category}</span>
						</div>

						{/* View Details Button */}
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								navigate(`/listing/${target_listing.id}`)
							}
							className="self-start"
						>
							View Details
						</Button>
					</div>
				</div>
			</CardHeader>

			<CardContent className="p-5 pt-0 space-y-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<Calendar className="w-5 h-5" />
						<span>{formattedDate}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="w-5 h-5" />
						<span>{formattedTime}</span>
					</div>
					<div className="flex items-center gap-2">
						<Badge
							variant="outline"
							className="uppercase text-xs px-2 py-1"
						>
							{pricing_type?.replace("_", " ")}
						</Badge>
					</div>
				</div>

				<div className="flex items-center justify-between">
					{/* Counterparty Info */}
					<div className="flex items-center gap-3">
						<Avatar className="w-10 h-10">
							<AvatarImage
								src={requester?.avatar}
								alt={requester?.name}
							/>
							<AvatarFallback>
								{requester?.name?.slice(0, 2).toUpperCase() ||
									"??"}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-semibold">
								{requester?.name}
							</p>
						</div>
					</div>

					{/* Action Buttons or Status */}
					{nStatus === "pending" ? (
						isIncoming ? (
							<div className="flex gap-3">
								<Button
									variant="outline"
									size="sm"
									disabled={isLoading}
									onClick={() => handleAction("accept")}
									className="transition-transform hover:scale-105"
								>
									{isLoading ? "..." : "Accept"}
								</Button>
								<Button
									variant="destructive"
									size="sm"
									disabled={isLoading}
									onClick={() => handleAction("reject")}
									className="transition-transform hover:scale-105"
								>
									{isLoading ? "..." : "Reject"}
								</Button>
							</div>
						) : (
							<Button
								variant="destructive"
								size="sm"
								disabled={isLoading}
								className="transition-transform hover:scale-105"
							>
								{isLoading ? "..." : "Cancel"}
							</Button>
						)
					) : (
						<Badge
							className={`uppercase text-xs px-3 py-1 font-semibold ${
								statusColor[status] ||
								"bg-muted text-muted-foreground"
							}`}
						>
							{nStatus}
						</Badge>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
