import React from "react";

export default function SlotList({ slots }) {
	return (
		<section className="bg-indigo-50 rounded-2xl p-8 shadow-inner max-w-4xl mx-auto">
			<h2 className="text-3xl font-semibold mb-6 text-indigo-700 text-center">
				Available Slots
			</h2>
			<ul className="space-y-3">
				{slots.map((slot, idx) => (
					<li
						key={idx}
						className={`p-4 rounded-lg border transition-colors duration-300 cursor-pointer ${
							slot.is_available
								? "border-indigo-400 bg-white hover:bg-indigo-100"
								: "border-red-400 bg-red-100 text-red-700 cursor-not-allowed line-through"
						}`}
					>
						📅{" "}
						{slot.days_of_week.charAt(0).toUpperCase() +
							slot.days_of_week.slice(1)}{" "}
						at {slot.slot_time}
					</li>
				))}
			</ul>
		</section>
	);
}
