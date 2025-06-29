"use client";

import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

export default function SlotDialog({ open, onClose, slotNumber, payload }) {
	const [availableListing, setAvailableListing] = useState([]);
	const [scheduledDate, setScheduledDate] = useState("");
	const { user } = useAuth();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				if (payload !== null) {
					const { user_id, days_of_week, slot_time, scheduled_date } =
						payload;
					setScheduledDate(scheduled_date);
					// console.log("inside ", payload);
					const res = await axiosInstance.get(
						"/bookings/available-listings",
						{
							params: { user_id, days_of_week, slot_time },
						}
					);
					// console.log("Response", res.data);
					setAvailableListing(res.data.data);
				}
			} catch (error) {
				// console.log(error);
				Swal.fire({
					icon: "warning",
					title: "Closed",
					text:
						error.response?.data?.message ||
						"Something went wrong.",
				});
				setAvailableListing([]);
			}
		};
		// console.log("available listing = ", availableListing);
		fetchListings();
	}, [slotNumber]);

	const handleCourseClick = async (listing) => {
		// console.log(listing);

		const payload = {
			listing_id: listing.listing_id,
			slot_id: listing.slot_id,
			scheduled_date: scheduledDate,
			provider_id: listing.user_id,
			learner_id: user.id,
			pricing_type: listing.pricing_type,
		};

		try {
			const res = await axiosInstance.post(
				"/bookings/new-booking",
				payload
			);
			// console.log("Response", res.data);
			Swal.fire({
				icon: "success",
				title: "Complete",
				text: "Booking Request Sent Successfully!",
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Slot {slotNumber}</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Select a Listings from below:
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3 py-4">
					{availableListing ? (
						availableListing.map((listing, index) => (
							<button
								key={index}
								onClick={() => handleCourseClick(listing)}
								className="text-left p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition shadow-sm cursor-pointer border border-gray-200"
							>
								{listing.title + " -> " + listing.pricing_type}
							</button>
						))
					) : (
						<div>
							<h3>This slot is not open for any listings</h3>
						</div>
					)}
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
