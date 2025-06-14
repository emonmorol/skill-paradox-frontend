import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AvailableSlots({
	slots,
	updateSlot,
	removeSlot,
	addSlot,
	DAYS,
}) {
	return (
		<div className="max-w-3xl p-6 bg-white rounded-xl shadow-lg ">
			<h2 className="text-2xl font-semibold mb-6 text-gray-900">
				Available Slots
			</h2>

			<ScrollArea className="max-h-[18rem] overflow-y-auto overflow-x-hidden bg-white rounded-lg bg-muted/30">
				{slots.map((slot, i) => (
					<div
						key={i}
						className="flex justify-between gap-4 items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
					>
						{/* Day Select (ShadCN) */}
						<Select
							value={slot.days_of_week}
							onValueChange={(value) =>
								updateSlot(i, "days_of_week", value)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select day" />
							</SelectTrigger>
							<SelectContent>
								{DAYS.map((d) => (
									<SelectItem key={d} value={d}>
										{d.charAt(0).toUpperCase() + d.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{/* Start Time */}
						<Input
							type="time"
							value={slot.start_time}
							onChange={(e) =>
								updateSlot(i, "start_time", e.target.value)
							}
						/>

						{/* End Time */}
						<Input
							type="time"
							value={slot.end_time}
							onChange={(e) =>
								updateSlot(i, "end_time", e.target.value)
							}
						/>

						{/* Availability */}
						<div className="flex items-center col-span-2">
							<Checkbox
								id={`available-${i}`}
								checked={slot.is_available}
								onCheckedChange={(checked) =>
									updateSlot(i, "is_available", !!checked)
								}
							/>
							<Label
								htmlFor={`available-${i}`}
								className="ml-2 text-sm text-gray-700"
							>
								Available
							</Label>
						</div>

						{/* Remove Button */}
						{slots.length > 1 && (
							<Button
								variant="destructive"
								size="sm"
								onClick={() => removeSlot(i)}
								className="px-3"
								aria-label="Remove slot"
							>
								×
							</Button>
						)}
					</div>
				))}
			</ScrollArea>

			<Button onClick={addSlot} className="mt-6 w-full" variant="modern">
				+ Add Slot
			</Button>
		</div>
	);
}
