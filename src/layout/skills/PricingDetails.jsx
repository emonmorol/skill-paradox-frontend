"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

const CURRENCIES = ["USD", "EUR", "BDT", "INR", "GBP"];

export default function PricingDetails({ pricing, setPricing }) {
	const [enabledSections, setEnabledSections] = useState(
		pricing.map(() => false)
	);

	const handleFieldChange = (index, field, value) => {
		const updated = [...pricing];
		updated[index] = {
			...updated[index],
			[field]: value,
		};
		setPricing(updated);
	};

	const toggleSection = (index) => {
		const updated = [...enabledSections];
		updated[index] = !updated[index];

		setEnabledSections(updated);
		handleFieldChange(index, "is_available", updated[index]);
	};

	return (
		<div className="max-w-5xl mx-auto space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Pricing Details
				</h2>
			</div>

			{pricing.map((item, index) => (
				<Card key={index} className="border shadow-md">
					<CardContent className="p-6 space-y-4">
						<div className="flex items-center gap-4">
							<Label className="text-base text-gray-700 dark:text-gray-300">
								Trade Type:{" "}
								<span className="capitalize">{item.type}</span>
							</Label>
							<div className="flex items-center gap-2">
								<Checkbox
									id={`edit-${index}`}
									checked={enabledSections[index]}
									onCheckedChange={() => toggleSection(index)}
								/>
								<Label htmlFor={`edit-${index}`}>
									Is Available? Check OK to edit
								</Label>
							</div>
						</div>

						{enabledSections[index] && (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-1">
									<Label>Price</Label>
									<Input
										type="number"
										min={0}
										placeholder="Enter price"
										value={item.price}
										onChange={(e) =>
											handleFieldChange(
												index,
												"price",
												Number(e.target.value)
											)
										}
									/>
								</div>

								<div className="space-y-1">
									<Label>Currency</Label>
									<Select
										value={item.currency}
										onValueChange={(value) =>
											handleFieldChange(
												index,
												"currency",
												value
											)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select currency" />
										</SelectTrigger>
										<SelectContent>
											{CURRENCIES.map((cur) => (
												<SelectItem
													key={cur}
													value={cur}
												>
													{cur}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-1">
									<Label>Number of Sessions</Label>
									<Input
										type="number"
										min={1}
										placeholder="e.g. 5"
										value={item.sessions}
										onChange={(e) =>
											handleFieldChange(
												index,
												"sessions",
												Number(e.target.value)
											)
										}
									/>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	);
}
