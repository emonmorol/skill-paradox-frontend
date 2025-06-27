import React from "react";
import { motion } from "framer-motion";

export default function PricingCard({
	pricing,
	outcomes,
	isUnavailable,
	onEnroll,
	capitalizeType,
	listingTitle,
	contributor,
}) {
	return (
		<motion.div
			whileHover={{
				scale: 1.04,
				boxShadow: "0 15px 25px rgba(99, 102, 241, 0.3)",
			}}
			transition={{ type: "spring", stiffness: 300 }}
			className={`p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between ${
				isUnavailable ? "bg-red-100" : "bg-white"
			}`}
		>
			<div>
				<h2 className="text-3xl font-semibold mb-4 text-indigo-700">
					{capitalizeType(pricing.type)} Pricing
				</h2>
				<p className="text-gray-800 text-2xl font-semibold mb-6">
					💰 {pricing.price} {pricing.currency} for{" "}
					{pricing.credit_hour} hours
				</p>

				<div>
					<h3 className="font-semibold text-indigo-600 mb-2 text-lg">
						Learning Outcomes:
					</h3>
					<ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 flex-grow">
						{outcomes
							.filter((o) => o.pricing_type === pricing.type)
							.map((o, idx) => (
								<li key={idx} className="text-lg">
									{o.outcome}
								</li>
							))}
					</ul>
				</div>
			</div>

			<button
				onClick={() =>
					onEnroll({
						pricingType: capitalizeType(pricing.type),
						amount: pricing.price,
						currency: pricing.currency,
						creditHour: pricing.credit_hour,
						listingTitle,
						contributor,
					})
				}
				disabled={isUnavailable}
				className={`mt-4 font-semibold py-2 px-6 rounded-xl shadow-md transition-colors duration-300 ${
					isUnavailable
						? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
						: "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
				}`}
			>
				Enroll
			</button>
		</motion.div>
	);
}
