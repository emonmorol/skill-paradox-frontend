"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ScheduleBuilder() {
	const [selectedDate, setSelectedDate] = useState(null);

	const handleSlotClick = (slotNumber) => {
		toast.warning(`Slot ${slotNumber} clicked`);
	};

	return (
		<div className="p-6 space-y-6 max-w-4xl mx-auto">
			{/* Header + Date Button */}
			<div className="space-y-2 text-center">
				<h2 className="text-2xl font-bold">Schedule Your Session</h2>

				{/* Show selected date + day if selected */}
				{selectedDate && (
					<p className="text-lg text-muted-foreground">
						Selected:{" "}
						<span className="font-medium">
							{format(selectedDate, "EEEE, yyyy-MM-dd")}
						</span>
					</p>
				)}

				<div className="flex justify-center mt-2">
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">
								{selectedDate ? "Change Date" : "Select a Date"}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={selectedDate}
								onSelect={setSelectedDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			{/* 24 Time Slots */}
			<div className="grid grid-cols-6 gap-4">
				{Array.from({ length: 24 }, (_, i) => (
					<Button
						key={i}
						variant="outline"
						className="h-16"
						onClick={() => handleSlotClick(i + 1)}
					>
						Slot {i + 1}
					</Button>
				))}
			</div>
		</div>
	);
}
