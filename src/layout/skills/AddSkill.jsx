"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import Stepper from "./Stepper";

const DAYS = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];

const CURRENCIES = ["USD", "EUR", "BDT", "GBP"];

export default function AddSkill() {
	const [step, setStep] = useState(1);

	const [listing, setListing] = useState({
		user_id: 1,
		skill_id: 1,
		title: "",
		description: "",
		proficiency_level: "beginner",
		banner: null,
		is_deleted: false,
		is_in_person_learning: false,
		location: null,
	});

	const [pricing, setPricing] = useState({
		listing_id: 1,
		type: "trade",
		duration: "",
		price: 0,
		currency: "TK",
	});

	const [outcomes, setOutcomes] = useState([{ pricing_id: 1, outcome: "" }]);
	const [faqs, setFaqs] = useState([
		{ listing_id: 1, question: "", answer: "", found_helpful: 0 },
	]);
	const [slots, setSlots] = useState([
		{
			pricing_id: 1,
			days_of_week: "monday",
			start_time: "",
			end_time: "",
			is_available: false,
		},
	]);

	function nextStep() {
		if (step < 5) setStep(step + 1);
	}
	function prevStep() {
		if (step > 1) setStep(step - 1);
	}

	function addOutcome() {
		setOutcomes([...outcomes, { pricing_id: 1, outcome: "" }]);
	}
	function updateOutcome(idx, val) {
		const newOutcomes = [...outcomes];
		newOutcomes[idx].outcome = val;
		setOutcomes(newOutcomes);
	}
	function removeOutcome(idx) {
		setOutcomes(outcomes.filter((_, i) => i !== idx));
	}

	function addFaq() {
		setFaqs([
			...faqs,
			{ listing_id: 1, question: "", answer: "", found_helpful: 0 },
		]);
	}
	function updateFaq(idx, field, val) {
		const newFaqs = [...faqs];
		newFaqs[idx][field] = val;
		setFaqs(newFaqs);
	}
	function removeFaq(idx) {
		setFaqs(faqs.filter((_, i) => i !== idx));
	}

	function addSlot() {
		setSlots([
			...slots,
			{
				pricing_id: 1,
				days_of_week: "monday",
				start_time: "",
				end_time: "",
				is_available: false,
			},
		]);
	}
	function updateSlot(idx, field, val) {
		const newSlots = [...slots];
		newSlots[idx][field] = val;
		setSlots(newSlots);
	}
	function removeSlot(idx) {
		setSlots(slots.filter((_, i) => i !== idx));
	}

	function canGoNext() {
		if (step === 1) {
			return (
				listing.title.trim() !== "" && listing.description.trim() !== ""
			);
		}
		if (step === 2) {
			if (pricing.type === "trade") return true;
			return (
				pricing.duration.trim() !== "" &&
				pricing.price > 0 &&
				pricing.currency.trim() !== ""
			);
		}
		return true;
	}

	function handleSubmit() {
		const payload = { listing, pricing, outcomes, faqs, slots };
		console.log("Submitting data:", payload);
		alert("Submitted! Check console.");
	}

	const steps = [1, 2, 3, 4, 5];

	return (
		<div className="max-w-3xl p-6 bg-white rounded-md shadow-md">
			<Stepper step={step} setStep={setStep} />

			{/* Step 1 - Listing */}
			{step === 1 && (
				<>
					<Card className="w-full max-w-3xl mx-auto">
						<CardContent className="p-6 space-y-6">
							<h2 className="text-2xl font-semibold">
								Listing Information
							</h2>

							{/* Title */}
							<div className="space-y-2">
								<Label htmlFor="title">Title *</Label>
								<Input
									id="title"
									placeholder="Skill title"
									value={listing.title}
									onChange={(e) =>
										setListing({
											...listing,
											title: e.target.value,
										})
									}
								/>
							</div>

							{/* Description */}
							<div className="space-y-2">
								<Label htmlFor="description">
									Description *
								</Label>
								<Textarea
									id="description"
									placeholder="Describe your skill"
									rows={4}
									value={listing.description}
									onChange={(e) =>
										setListing({
											...listing,
											description: e.target.value,
										})
									}
								/>
							</div>

							{/* Proficiency Level */}
							<div className="space-y-2">
								<Label>Proficiency Level *</Label>
								<Select
									value={listing.proficiency_level}
									onValueChange={(value) =>
										setListing({
											...listing,
											proficiency_level: value,
										})
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select level" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="beginner">
											Beginner
										</SelectItem>
										<SelectItem value="intermediate">
											Intermediate
										</SelectItem>
										<SelectItem value="expert">
											Expert
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* In-person Learning Checkbox */}
							<div className="flex items-center space-x-3">
								<Checkbox
									id="inPerson"
									checked={listing.is_in_person_learning}
									onCheckedChange={(checked) =>
										setListing({
											...listing,
											is_in_person_learning: !!checked,
											location: "",
										})
									}
								/>
								<Label htmlFor="inPerson">
									Is this in-person learning?
								</Label>
							</div>

							{/* Location if in-person */}
							{listing.is_in_person_learning && (
								<div className="space-y-2">
									<Label htmlFor="location">Location</Label>
									<Input
										id="location"
										placeholder="Where will this take place?"
										value={listing.location || ""}
										onChange={(e) =>
											setListing({
												...listing,
												location: e.target.value,
											})
										}
									/>
								</div>
							)}
						</CardContent>
					</Card>
				</>
			)}

			{/* Step 2 - Pricing */}
			{step === 2 && (
				<>
					<h2 className="text-2xl font-semibold mb-4">
						Pricing Details
					</h2>
					<div className="space-y-4">
						<div>
							<Label htmlFor="type">Type</Label>
							<Select
								id="type"
								value={pricing.type}
								onChange={(e) =>
									setPricing({
										...pricing,
										type: e.target.value,
									})
								}
							>
								<option value="trade">Trade</option>
								<option value="semi_trade">Semi Trade</option>
								<option value="paid">Paid</option>
							</Select>
						</div>

						<div>
							<Label htmlFor="duration">Duration</Label>
							<Input
								id="duration"
								type="text"
								value={pricing.duration}
								onChange={(e) =>
									setPricing({
										...pricing,
										duration: e.target.value,
									})
								}
								placeholder="e.g. 1 hour"
							/>
						</div>

						{pricing.type !== "trade" && (
							<>
								<div>
									<Label htmlFor="price">Price</Label>
									<Input
										id="price"
										type="number"
										min={0}
										value={pricing.price}
										onChange={(e) =>
											setPricing({
												...pricing,
												price:
													Number(e.target.value) || 0,
											})
										}
										placeholder="0"
									/>
								</div>

								<div>
									<Label htmlFor="currency">Currency</Label>
									<Select
										id="currency"
										value={pricing.currency}
										onChange={(e) =>
											setPricing({
												...pricing,
												currency: e.target.value,
											})
										}
									>
										{CURRENCIES.map((c) => (
											<option key={c} value={c}>
												{c}
											</option>
										))}
									</Select>
								</div>
							</>
						)}
					</div>
				</>
			)}

			{/* Step 3 - Outcomes */}
			{step === 3 && (
				<>
					<h2 className="text-2xl font-semibold mb-4">
						Learning Outcomes
					</h2>
					<ScrollArea className="max-h-64 space-y-4">
						{outcomes.map((o, i) => (
							<div
								key={i}
								className="flex items-center space-x-2"
							>
								<Textarea
									className="flex-1"
									value={o.outcome}
									placeholder="Describe an outcome"
									onChange={(e) =>
										updateOutcome(i, e.target.value)
									}
									rows={2}
								/>
								{outcomes.length > 1 && (
									<Button
										variant="destructive"
										size="sm"
										onClick={() => removeOutcome(i)}
										aria-label="Remove outcome"
									>
										×
									</Button>
								)}
							</div>
						))}
					</ScrollArea>
					<Button onClick={addOutcome} className="mt-4">
						+ Add Outcome
					</Button>
				</>
			)}

			{/* Step 4 - FAQ */}
			{step === 4 && (
				<>
					<h2 className="text-2xl font-semibold mb-4">FAQs</h2>
					<ScrollArea className="max-h-72 space-y-4">
						{faqs.map((faq, i) => (
							<div
								key={i}
								className="space-y-2 border rounded-md p-3"
							>
								<Input
									placeholder="Question"
									value={faq.question}
									onChange={(e) =>
										updateFaq(i, "question", e.target.value)
									}
								/>
								<Textarea
									placeholder="Answer"
									rows={3}
									value={faq.answer}
									onChange={(e) =>
										updateFaq(i, "answer", e.target.value)
									}
								/>
								{faqs.length > 1 && (
									<Button
										variant="destructive"
										size="sm"
										onClick={() => removeFaq(i)}
										aria-label="Remove FAQ"
									>
										Remove
									</Button>
								)}
							</div>
						))}
					</ScrollArea>
					<Button onClick={addFaq} className="mt-4">
						+ Add FAQ
					</Button>
				</>
			)}

			{/* Step 5 - Slots */}
			{step === 5 && (
				<>
					<h2 className="text-2xl font-semibold mb-4">
						Available Slots
					</h2>
					<ScrollArea className="max-h-72 space-y-4">
						{slots.map((slot, i) => (
							<div
								key={i}
								className="grid grid-cols-6 gap-2 items-center border rounded-md p-3"
							>
								<Select
									value={slot.days_of_week}
									onChange={(e) =>
										updateSlot(
											i,
											"days_of_week",
											e.target.value
										)
									}
								>
									{DAYS.map((d) => (
										<option key={d} value={d}>
											{d.charAt(0).toUpperCase() +
												d.slice(1)}
										</option>
									))}
								</Select>

								<Input
									type="time"
									value={slot.start_time}
									onChange={(e) =>
										updateSlot(
											i,
											"start_time",
											e.target.value
										)
									}
								/>
								<Input
									type="time"
									value={slot.end_time}
									onChange={(e) =>
										updateSlot(
											i,
											"end_time",
											e.target.value
										)
									}
								/>

								<div className="flex items-center">
									<Checkbox
										checked={slot.is_available}
										onCheckedChange={(checked) =>
											updateSlot(
												i,
												"is_available",
												!!checked
											)
										}
									/>
									<Label className="ml-2">Available</Label>
								</div>

								{slots.length > 1 && (
									<Button
										variant="destructive"
										size="sm"
										onClick={() => removeSlot(i)}
										aria-label="Remove slot"
									>
										×
									</Button>
								)}
							</div>
						))}
					</ScrollArea>

					<Button onClick={addSlot} className="mt-4">
						+ Add Slot
					</Button>
				</>
			)}

			{/* Navigation Buttons */}
			<div className="flex justify-between mt-8">
				{step > 1 && (
					<Button variant="outline" onClick={prevStep}>
						Back
					</Button>
				)}
				{step < 5 && (
					<Button disabled={!canGoNext()} onClick={nextStep}>
						Next
					</Button>
				)}
				{step === 5 && (
					<Button onClick={handleSubmit} variant="default">
						Submit
					</Button>
				)}
			</div>
		</div>
	);
}
