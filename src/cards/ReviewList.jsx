import React from "react";
import { Star } from "lucide-react";

export default function ReviewList({ reviews }) {
	return (
		<section className="bg-indigo-50 rounded-2xl p-8 shadow-inner max-w-4xl mx-auto">
			<h2 className="text-3xl font-semibold mb-6 text-indigo-700 text-center">
				Reviews
			</h2>
			<ul className="space-y-6">
				{reviews.map((review, i) => (
					<li
						key={i}
						className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
					>
						<div className="flex items-center justify-between mb-3">
							<p className="font-semibold text-gray-900 text-lg">
								Reviewer #{review.reviewer_id}
							</p>
							<p className="flex items-center gap-1 text-yellow-400 font-semibold text-lg">
								<Star className="w-5 h-5" /> {review.rating}/5
							</p>
						</div>
						<p className="text-gray-700 text-lg">
							{review.comment}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
