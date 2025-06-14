import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Faqs({ faqs, updateFaq, removeFaq, addFaq }) {
	return (
		<div className="max-w-3xl p-6 bg-white rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold mb-6 text-gray-900">FAQs</h2>

			<ScrollArea className="space-y-6 max-h-[20.5rem] overflow-y-auto overflow-x-hidden bg-white rounded-lg bg-muted/30">
				{faqs.map((faq, i) => (
					<div
						key={i}
						className="space-y-3 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
					>
						<Input
							placeholder="Question"
							value={faq.question}
							onChange={(e) =>
								updateFaq(i, "question", e.target.value)
							}
							className="bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
							autoComplete="off"
						/>
						<Textarea
							placeholder="Answer"
							rows={3}
							value={faq.answer}
							onChange={(e) =>
								updateFaq(i, "answer", e.target.value)
							}
							className="bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
						/>

						{faqs.length > 1 && (
							<Button
								variant="destructive"
								size="sm"
								onClick={() => removeFaq(i)}
								aria-label={`Remove FAQ ${i + 1}`}
								className="w-full"
							>
								Remove
							</Button>
						)}
					</div>
				))}
			</ScrollArea>

			<Button onClick={addFaq} variant="modern" className="mt-4 w-full">
				+ Add FAQ
			</Button>
		</div>
	);
}
