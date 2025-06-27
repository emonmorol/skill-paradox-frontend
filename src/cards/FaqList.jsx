import React from "react";

export default function FaqList({ faqs }) {
	return (
		<section className="bg-indigo-50 rounded-2xl p-8 shadow-inner max-w-4xl mx-auto">
			<h2 className="text-3xl font-semibold mb-6 text-indigo-700 text-center">
				FAQs
			</h2>
			<ul className="space-y-6">
				{faqs.map((faq, i) => (
					<li
						key={i}
						className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
					>
						<p className="font-semibold text-gray-900 text-xl">
							Q: {faq.question}
						</p>
						<p className="mt-3 text-gray-700 text-lg">
							A: {faq.answer}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
