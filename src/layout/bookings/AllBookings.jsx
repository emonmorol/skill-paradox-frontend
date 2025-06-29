import React, { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import BookingCard from "@/cards/BookingCard";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";

const sampleBookings = [
	{
		id: 1,
		listing_id: 2,
		listing_title: "Yoga for Beginners",
		slot_time: "10:00 AM",
		scheduled_date: "2025-07-01",
		provider_id: 5,
		provider_name: "Ayesha Siddique",
		learner_id: 8,
		learner_name: "John Doe",
		pricing_type: "trade",
		meeting_link: "https://zoom.us/j/123456789",
		notes: "Bring a mat and towel.",
		status: "confirmed",
	},
	{
		id: 2,
		listing_title: "React Crash Course",
		scheduled_date: "2025-07-05",
		slot_time: "4:00 PM",
		provider_name: "Ikramul",
		learner_name: "Farhan",
		pricing_type: "paid",
		meeting_link: null,
		notes: null,
		status: "pending",
	},
	{
		id: 3,
		listing_title: "Personal Finance Coaching",
		scheduled_date: "2025-07-10",
		slot_time: "2:30 PM",
		provider_name: "Sarah",
		learner_name: "Ali",
		pricing_type: "semi_trade",
		meeting_link: "https://meet.google.com/abc-defg-hij",
		notes: "Please be on time.",
		status: "cancelled",
	},
];

export default function AllBookings() {
	const [statusFilter, setStatusFilter] = useState("all");
	const [bookings, setBookings] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const res = await axiosInstance.get("/bookings", {
					params: { id: user.id, status: statusFilter },
				});
				// console.log(res.data);
				setBookings(res.data.data);
			} catch (error) {
				if (error.name !== "CanceledError") {
					console.error("Failed to fetch listings:", error);
				}
			}
		};

		fetchListings();
	}, [statusFilter]);

	const filteredBookings =
		statusFilter === "all"
			? sampleBookings
			: sampleBookings.filter((b) => b.status === statusFilter);

	return (
		<div className="p-6 mx-auto space-y-6">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<h2 className="text-2xl font-bold">All Bookings</h2>

				{/* Status Filter */}
				<Select onValueChange={setStatusFilter} defaultValue="all">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="pending">Pending</SelectItem>
						<SelectItem value="confirmed">Confirmed</SelectItem>
						<SelectItem value="completed">Completed</SelectItem>
						<SelectItem value="cancelled">Cancelled</SelectItem>
						<SelectItem value="declined">Declined</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Booking List */}
			<BookingCard
				bookings={bookings}
				onAction={(action, booking) => {
					if (action === "refresh") {
						// fallback, not used anymore
						return;
					}
					if (action === "update-status") {
						setBookings((prev) =>
							prev.map((b) =>
								b.id === booking.id
									? { ...b, status: booking.status }
									: b
							)
						);
					}
					if (action === "view") {
						// handle modal or navigation to details
						console.log("Viewing booking", booking);
					}
				}}
			/>
		</div>
	);
}
