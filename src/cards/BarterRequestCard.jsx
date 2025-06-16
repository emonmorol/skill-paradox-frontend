import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	Calendar,
	Clock,
	Repeat2,
	MapPin,
	MoreVertical,
	DollarSign,
	Tag,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function BarterRequestCard({
	id,
	title,
	skillName,
	skillCategory,
	proficiencyLevel,
	description,
	date,
	time,
	status,
	counterparty,
	counterpartyAvatarUrl,
	isIncoming,
	isInPersonLearning,
	location,
	price,
	currency,
	tradeType,
	tags = [],
	onChat = () => alert("Opening chat..."),
	onViewProfile = () => alert("Viewing profile..."),
	onReport = () => alert("Reported."),
	onAccept = async () => alert("Accept action triggered."),
	onReject = async () => alert("Reject action triggered."),
	onCancel = async () => alert("Cancel action triggered."),
}) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const card = document.querySelector(".barter-card");
		if (card) {
			card.classList.add("fade-in");
		}
	}, []);

	const statusColor = {
		pending: "bg-yellow-100 text-yellow-800",
		accepted: "bg-green-100 text-green-800",
		rejected: "bg-red-100 text-red-800",
		completed: "bg-gray-200 text-gray-800",
	};

	const handleAction = async (actionFn, actionName) => {
		if (!actionFn) {
			alert(`${actionName} action is not implemented`);
			return;
		}
		setIsLoading(true);
		try {
			await actionFn();
			alert(`${actionName} succeeded for "${title}"`);
		} catch (error) {
			alert(`${actionName} failed: ${error.message}`);
		}
		setIsLoading(false);
	};

	const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

	return (
		<Card className="barter-card w-full max-w-md rounded-3xl bg-white p-0 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-default overflow-hidden">
			<CardHeader className="flex flex-col gap-3 p-5 relative">
				{/* 3-dot menu */}
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
							<DropdownMenuItem
								onClick={() => alert(description)}
							>
								View Full Description
							</DropdownMenuItem>
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
					{title}
				</CardTitle>

				<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
					<div className="flex items-center gap-1">
						<Tag className="w-4 h-4" />
						<span className="font-medium">{skillName}</span>
					</div>
					{skillCategory && (
						<Badge variant="outline" className="text-xs px-2 py-1">
							{skillCategory}
						</Badge>
					)}
					{proficiencyLevel && (
						<Badge
							variant="secondary"
							className="text-xs px-2 py-1 uppercase"
						>
							{proficiencyLevel}
						</Badge>
					)}
				</div>

				{description && (
					<p className="mt-2 italic text-sm text-gray-600 line-clamp-3">
						{description}
					</p>
				)}

				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-2">
						{tags.map((tag) => (
							<Badge
								key={tag}
								variant="outline"
								className="text-xs px-2 py-1"
							>
								{tag}
							</Badge>
						))}
					</div>
				)}
			</CardHeader>

			<CardContent className="p-5 pt-0 space-y-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<Calendar className="w-5 h-5" />
						<span>{date}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="w-5 h-5" />
						<span>{time}</span>
					</div>
					{isInPersonLearning && location && (
						<div className="flex items-center gap-2 col-span-2 sm:col-span-1">
							<MapPin className="w-5 h-5" />
							<span>{location}</span>
						</div>
					)}

					{typeof price === "number" && (
						<div className="flex items-center gap-2">
							<DollarSign className="w-5 h-5" />
							<span>
								{price.toFixed(2)} {currency}
							</span>
						</div>
					)}
					{tradeType && (
						<Badge
							variant="outline"
							className="uppercase text-xs px-2 py-1"
						>
							{tradeType.replace("_", " ")}
						</Badge>
					)}
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Avatar className="w-10 h-10">
							<AvatarImage
								src={counterpartyAvatarUrl}
								alt={counterparty}
								loading="lazy"
							/>
							<AvatarFallback>
								{counterparty
									? counterparty.slice(0, 2).toUpperCase()
									: "??"}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-semibold">
								{counterparty}
							</p>
						</div>
					</div>

					{status === "pending" ? (
						isIncoming ? (
							<div className="flex gap-3">
								<Button
									variant="outline"
									size="sm"
									disabled={isLoading}
									onClick={() =>
										handleAction(onAccept, "Accept")
									}
									className="transition-transform hover:scale-105"
								>
									{isLoading ? "..." : "Accept"}
								</Button>
								<Button
									variant="destructive"
									size="sm"
									disabled={isLoading}
									onClick={() =>
										handleAction(onReject, "Reject")
									}
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
								onClick={() => handleAction(onCancel, "Cancel")}
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
							{formattedStatus}
						</Badge>
					)}
				</div>
			</CardContent>

			{/* <style jsx>{`
				.barter-card {
					opacity: 0;
					transform: translateY(20px);
					transition: opacity 0.6s ease, transform 0.6s ease;
				}
				.barter-card.fade-in {
					opacity: 1;
					transform: translateY(0);
				}
				.line-clamp-3 {
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style> */}
		</Card>
	);
}
