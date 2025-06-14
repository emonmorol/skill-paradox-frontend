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
import PricingDetails from "./PricingDetails";
import ListingInformation from "./ListingInformation";
import LearningOutcomes from "./LearningOutcomes";
import Faqs from "./Faqs";
import AvailableSlots from "./AvailableSlots";

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
			{ listing_id: 1, question: "", answer: "", found_helpful: 0 },
			...faqs,
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
			{
				pricing_id: 1,
				days_of_week: "monday",
				start_time: "",
				end_time: "",
				is_available: false,
			},
			...slots,
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
		<div className="">
			<div className="min-h-[35rem] w-2/3 m-auto max-w-3xl p-6 bg-white rounded-md shadow-md flex flex-col justify-between">
				<Stepper step={step} setStep={setStep} />

				{/* Step 1 - Listing */}
				{step === 1 && (
					<ListingInformation
						listing={listing}
						setListing={setListing}
					/>
				)}

				{/* Step 2 - Pricing */}
				{step === 2 && (
					<PricingDetails pricing={pricing} setPricing={setPricing} />
				)}

				{/* Step 3 - Outcomes */}
				{step === 3 && (
					<LearningOutcomes
						outcomes={outcomes}
						updateOutcome={updateOutcome}
						removeOutcome={removeOutcome}
						addOutcome={addOutcome}
					/>
				)}

				{/* Step 4 - FAQ */}
				{step === 4 && (
					<Faqs
						faqs={faqs}
						updateFaq={updateFaq}
						removeFaq={removeFaq}
						addFaq={addFaq}
					/>
				)}

				{/* Step 5 - Slots */}
				{step === 5 && (
					<AvailableSlots
						slots={slots}
						updateSlot={updateSlot}
						removeSlot={removeSlot}
						addSlot={addSlot}
						DAYS={DAYS}
					/>
				)}
				{/* Navigation Buttons */}
				<div className="flex justify-between flex-end mt-8">
					{step > 1 && (
						<Button
							variant="modern"
							onClick={prevStep}
							className="bg-transparent border text-gray-700 hover:bg-gray-100"
						>
							Back
						</Button>
					)}
					{step < 5 && (
						<Button
							variant="modern"
							disabled={!canGoNext()}
							onClick={nextStep}
						>
							Next
						</Button>
					)}
					{step === 5 && (
						<Button
							onClick={handleSubmit}
							variant="modern"
							className="from-green-500 to-green-700 hover:from-green-700 hover:to-green-500"
						>
							Submit
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
