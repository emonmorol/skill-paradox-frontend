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
		<div className="max-w-3xl md:w-full p-6 rounded-xl shadow-lg bg-white space-y-4">
			<h2 className="text-2xl font-semibold text-gray-900">
				Available Slots
			</h2>

			<ScrollArea className="max-h-[22rem] overflow-y-auto overflow-x-hidden rounded-lg bg-muted/30 space-y-4 pr-2">
				{slots.map((slot, i) => (
					<div
						key={i}
						className="flex flex-wrap gap-4 items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
					>
						{/* Day Select */}
						<div className="space-y-1">
							<Label className="text-sm text-gray-700">Day</Label>
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
											{d.charAt(0).toUpperCase() +
												d.slice(1)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Start Time */}
						<div className="space-y-1">
							<Label className="text-sm text-gray-700">
								Start Time
							</Label>
							<Input
								type="time"
								value={slot.start_time}
								onChange={(e) =>
									updateSlot(i, "start_time", e.target.value)
								}
							/>
						</div>

						{/* End Time */}
						<div className="space-y-1">
							<Label className="text-sm text-gray-700">
								End Time
							</Label>
							<Input
								type="time"
								value={slot.end_time}
								onChange={(e) =>
									updateSlot(i, "end_time", e.target.value)
								}
							/>
						</div>

						{/* Barter Type */}
						<div className="space-y-1">
							<Label className="text-sm text-gray-700">
								Barter Type
							</Label>
							<Select
								value={slot.barter_type}
								onValueChange={(value) =>
									updateSlot(i, "barter_type", value)
								}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="trade">Trade</SelectItem>
									<SelectItem value="semi_trade">
										Semi Trade
									</SelectItem>
									<SelectItem value="paid">Paid</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Availability Checkbox + Remove */}
						<div className="flex flex-col gap-2 items-start">
							<div className="flex items-center gap-2 mt-6">
								<Checkbox
									id={`available-${i}`}
									checked={slot.is_available}
									onCheckedChange={(checked) =>
										updateSlot(i, "is_available", !!checked)
									}
								/>
								<Label
									htmlFor={`available-${i}`}
									className="text-sm text-gray-700"
								>
									Available
								</Label>
							</div>
							{slots.length > 1 && (
								<Button
									variant="destructive"
									size="sm"
									onClick={() => removeSlot(i)}
									className="mt-1"
									aria-label="Remove slot"
								>
									×
								</Button>
							)}
						</div>
					</div>
				))}
			</ScrollArea>

			<Button onClick={addSlot} className="mt-4 w-full" variant="modern">
				+ Add Slot
			</Button>
		</div>
	);
}
