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
import SlotDialog from "../../components/custom/SlotDialog";
import SlotButton from "../../components/custom/SlotButton";

export default function MyScheduleProps() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentSlot, setCurrentSlot] = useState(null);

	const handleSlotClick = (slotNumber) => {
		setCurrentSlot(slotNumber);
		setDialogOpen(true);
	};

	return (
		<div className="p-6 space-y-6 max-w-4xl mx-auto">
			{/* Header + Date Picker */}
			<div className="space-y-2 text-center">
				<h2 className="text-2xl font-bold">Schedule Your Session</h2>

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

			{/* Slots Grid */}
			<div className="grid grid-cols-6 gap-4">
				{Array.from({ length: 24 }, (_, i) => (
					<SlotButton
						key={i}
						slotNumber={i + 1}
						onClick={handleSlotClick}
					/>
				))}
			</div>

			{/* Dialog */}
			<SlotDialog
				open={dialogOpen}
				onClose={setDialogOpen}
				slotNumber={currentSlot}
			/>
		</div>
	);
}
