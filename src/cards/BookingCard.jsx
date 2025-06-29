import React from "react";
import { Calendar, Clock, Info, MoreVertical } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

export default function BookingCard({ bookings = [], onAction = () => {} }) {
	const statusColor = {
		pending: "border-yellow-500 text-yellow-600",
		confirmed: "border-blue-500 text-blue-600",
		declined: "border-red-500 text-red-600",
		cancelled: "border-gray-400 text-gray-500",
		completed: "border-green-500 text-green-600",
	};

	const handleStatusChange = async (bookingId, newStatus) => {
		try {
			await axiosInstance.patch(`/bookings/response`, {
				id: bookingId,
				status: newStatus,
			});
			toast.success(`Booking ${newStatus}`);
			onAction("update-status", { id: bookingId, status: newStatus });
		} catch (error) {
			console.error(error);
			toast.error(`Failed to update booking status`);
		}
	};

	return (
		<div className="w-full overflow-x-auto">
			<div className="min-w-[900px] space-y-2">
				{/* Header */}
				<div className="grid grid-cols-7 gap-4 px-4 py-2 font-semibold text-sm text-gray-700 border-b bg-muted rounded-md">
					<p>Listing</p>
					<p>Date & Time</p>
					<p>Provider</p>
					<p>Learner</p>
					<p>Type</p>
					<p>Status</p>
					<p className="text-right">Actions</p>
				</div>

				{/* Booking Rows */}
				{bookings.map((booking) => (
					<div
						key={booking.id}
						className="grid grid-cols-7 gap-4 px-4 py-3 border rounded-lg bg-white items-center text-sm text-gray-800 shadow-sm hover:shadow-md transition-shadow"
					>
						{/* Listing Title + Notes */}
						<div className="flex flex-col">
							<span className="font-semibold truncate">
								{booking.listing_title || "N/A"}
							</span>
							{booking.notes && (
								<span className="text-xs text-muted-foreground mt-1">
									<Info className="w-3 h-3 inline mr-1" />
									{booking.notes}
								</span>
							)}
						</div>

						{/* Date & Time */}
						<div className="flex flex-col text-muted-foreground">
							<span className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								{booking.scheduled_date || "N/A"}
							</span>
							<span className="flex items-center gap-1 mt-1">
								<Clock className="w-4 h-4" />
								{booking.slot_time || "N/A"}
							</span>
						</div>

						{/* Provider */}
						<p>{booking.provider_name || "N/A"}</p>

						{/* Learner */}
						<p>{booking.learner_name || "N/A"}</p>

						{/* Pricing Type */}
						<p className="capitalize">
							{booking.pricing_type || "N/A"}
						</p>

						{/* Status */}
						<Badge
							variant="outline"
							className={`text-xs font-medium uppercase px-2 py-1 w-fit ${
								statusColor[booking.status] ||
								"border-gray-300 text-gray-600"
							}`}
						>
							{booking.status || "N/A"}
						</Badge>

						{/* Actions */}
						<div className="text-right">
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
										onClick={() =>
											onAction("view", booking)
										}
									>
										View Details
									</DropdownMenuItem>

									{booking.status === "confirmed" &&
										booking.meeting_link && (
											<DropdownMenuItem
												onClick={() =>
													window.open(
														booking.meeting_link,
														"_blank"
													)
												}
											>
												Join Meeting
											</DropdownMenuItem>
										)}

									{booking.status === "pending" && (
										<>
											<DropdownMenuItem
												onClick={() =>
													handleStatusChange(
														booking.id,
														"confirmed"
													)
												}
											>
												Accept Booking
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													handleStatusChange(
														booking.id,
														"declined"
													)
												}
											>
												Reject Booking
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													handleStatusChange(
														booking.id,
														"cancelled"
													)
												}
											>
												Cancel Booking
											</DropdownMenuItem>
										</>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
