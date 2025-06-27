import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star } from "lucide-react";
import { motion } from "framer-motion";

import PricingCard from "@/cards/PricingCard";
import SlotList from "@/cards/SlotList";
import FaqList from "@/cards/FaqList";
import ReviewList from "@/cards/ReviewList";

const data = {
	listing: {
		id: 1,
		user_id: 1,
		skill_id: 2,
		title: "Web Development",
		description:
			"Build modern, responsive websites with HTML, CSS, and JS.",
		proficiency_level: "beginner",
		banner: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1974&auto=format&fit=crop",
		is_deleted: false,
		is_in_person_learning: true,
		location: "Dhaka, Bangladesh",
		learners: 12300,
		rating: 4.8,
		contributor: {
			name: "Ayesha Rahman",
			avatarUrl: "/avatars/ayesha.png",
		},
	},
	pricing: [
		{
			listing_id: 1,
			type: "paid",
			credit_hour: 10,
			price: 99.99,
			currency: "USD",
		},
		{
			listing_id: 1,
			type: "barter",
			credit_hour: 10,
			price: 99.99,
			currency: "USD",
		},
		{
			listing_id: 1,
			type: "semi trade",
			credit_hour: 15,
			price: 49.99,
			currency: "USD",
		},
	],
	faqs: [
		{
			listing_id: 1,
			question: "What are the prerequisites?",
			answer: "Basic knowledge of computers.",
			found_helpful: 0,
		},
		{
			listing_id: 1,
			question: "What is the course duration?",
			answer: "10 weeks with weekly sessions.",
			found_helpful: 0,
		},
		{
			listing_id: 1,
			question: "Are there any assessments?",
			answer: "Yes, quizzes after each module.",
			found_helpful: 0,
		},
	],
	outcomes: [
		{
			pricing_type: "paid",
			outcome:
				"Learn to build modern, responsive websites.Learn to build modern, responsive websites.",
		},
		{
			pricing_type: "barter",
			outcome: "Understand core HTML, CSS, and JavaScript.",
		},
		{
			pricing_type: "semi trade",
			outcome:
				"Gain intermediate JavaScript skills with hands-on projects.",
		},
	],
	slots: [
		{
			pricing_type: "paid",
			days_of_week: "monday",
			slot_time: "10:00 - 12:00",
			is_available: true,
		},
		{
			pricing_type: "paid",
			days_of_week: "wednesday",
			slot_time: "14:00 - 16:00",
			is_available: false,
		},
		{
			pricing_type: "barter",
			days_of_week: "friday",
			slot_time: "09:00 - 11:00",
			is_available: true,
		},
		{
			pricing_type: "semi trade",
			days_of_week: "tuesday",
			slot_time: "13:00 - 15:00",
			is_available: true,
		},
		{
			pricing_type: "semi trade",
			days_of_week: "thursday",
			slot_time: "16:00 - 18:00",
			is_available: false,
		},
	],
	review: [
		{
			booking_id: 1,
			reviewer_id: 1,
			rating: 5,
			comment: "Very informative and clear. Highly recommended!",
			listing_id: 1,
		},
		{
			booking_id: 2,
			reviewer_id: 2,
			rating: 5,
			comment: "Excellent course, learned a lot!",
			listing_id: 1,
		},
	],
};

export default function ListingDetails() {
	const { id } = useParams();
	const navigate = useNavigate();

	const listingId = Number(id);
	const listing = data.listing.id === listingId ? data.listing : null;

	if (!listing) {
		return (
			<div className="p-8 text-center text-xl font-semibold">
				Listing not found
			</div>
		);
	}

	const pricing = data.pricing.filter((p) => p.listing_id === listingId);
	const faqs = data.faqs.filter((f) => f.listing_id === listingId);
	const outcomes = data.outcomes;
	const slots = data.slots;
	const reviews = data.review.filter((r) => r.listing_id === listingId);

	const capitalizeType = (type) =>
		type
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");

	const hasUnavailableSlot = (pricingType) =>
		slots.some(
			(slot) =>
				slot.pricing_type === pricingType && slot.is_available === false
		);

	const handleEnroll = (state) => {
		navigate("/checkout", { state });
	};

	return (
		<motion.div
			className="min-h-screen bg-gray-50 px-6 py-10"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-10 space-y-10">
				{/* Banner and Title */}
				<div className="flex flex-col md:flex-row gap-8">
					<img
						src={listing.banner}
						alt={listing.title}
						className="rounded-xl w-full md:w-1/2 max-h-96 object-cover shadow-md hover:scale-105 transition-transform duration-300"
					/>
					<div className="flex flex-col justify-between">
						<div>
							<h1 className="text-5xl font-extrabold text-gray-900 mb-4">
								{listing.title}
							</h1>
							<p className="text-lg text-gray-700 max-w-xl leading-relaxed">
								{listing.description}
							</p>
						</div>

						{/* Contributor & Learners */}
						<div className="mt-8 flex items-center gap-6 flex-wrap text-gray-700">
							<div className="flex items-center gap-3">
								<Avatar className="w-12 h-12 ring-2 ring-indigo-500 shadow-md">
									<AvatarImage
										src={listing.contributor.avatarUrl}
										alt={listing.contributor.name}
									/>
									<AvatarFallback>
										{listing.contributor.name
											.slice(0, 2)
											.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-semibold text-gray-900">
										{listing.contributor.name}
									</p>
									<p className="text-sm text-gray-500">
										Contributor
									</p>
								</div>
							</div>

							<div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
								<Users className="w-7 h-7" />
								<span>
									{listing.learners.toLocaleString()} Learners
								</span>
							</div>

							<div className="flex items-center gap-2 text-yellow-400 font-semibold text-lg">
								<Star className="w-7 h-7" />
								<span>{listing.rating} Rating</span>
							</div>
						</div>
					</div>
				</div>

				{/* Key Info Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left text-gray-600 font-medium">
					<div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-indigo-300 transition-shadow duration-300 cursor-default">
						<h3 className="text-indigo-700 font-semibold mb-1 uppercase tracking-wide">
							Proficiency
						</h3>
						<p className="text-xl">{listing.proficiency_level}</p>
					</div>
					<div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-indigo-300 transition-shadow duration-300 cursor-default">
						<h3 className="text-indigo-700 font-semibold mb-1 uppercase tracking-wide">
							Location
						</h3>
						<p className="text-xl">
							{listing.location ?? "Online"}
						</p>
					</div>
					<div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-indigo-300 transition-shadow duration-300 cursor-default">
						<h3 className="text-indigo-700 font-semibold mb-1 uppercase tracking-wide">
							In-Person
						</h3>
						<p className="text-xl">
							{listing.is_in_person_learning ? "Yes" : "No"}
						</p>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className="grid md:grid-cols-3 gap-8">
					{pricing.map((item, i) => (
						<PricingCard
							key={i}
							pricing={item}
							outcomes={outcomes}
							isUnavailable={hasUnavailableSlot(item.type)}
							onEnroll={handleEnroll}
							capitalizeType={capitalizeType}
							listingTitle={listing.title}
							contributor={listing.contributor.name}
						/>
					))}
				</div>

				{/* Slots Section */}
				<SlotList slots={slots} />

				{/* FAQs */}
				<FaqList faqs={faqs} />

				{/* Reviews */}
				<ReviewList reviews={reviews} />

				{/* Back Button */}
				<div className="flex gap-6 justify-center md:justify-end mt-12">
					<button
						className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 font-semibold rounded-xl px-8 py-4 transition-colors duration-300 text-lg"
						onClick={() => navigate(-1)}
					>
						Back
					</button>
				</div>
			</div>
		</motion.div>
	);
}
