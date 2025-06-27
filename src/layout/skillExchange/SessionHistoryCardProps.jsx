import React from "react";
import ExchangeHistoryList from "./ExchangeHistoryList";

const sampleHistory = [
	{
		id: 1,
		title: "Mastering Skill 9 Fundamentals",
		skill: "Fitness Coaching",
		category: "Health & Wellness",
		status: "pending",
	},
	{
		id: 2,
		title: "Mastering Skill 6 Fundamentals",
		skill: "Graphic Design",
		category: "Design",
		status: "accepted",
	},
	{
		id: 3,
		title: "Advanced React Techniques",
		skill: "React.js",
		category: "Web Development",
		status: "rejected",
	},
	{
		id: 4,
		title: "Yoga & Mindfulness",
		skill: "Yoga",
		category: "Health & Wellness",
		status: "accepted",
	},
];

export default function SessionHistoryCardProps() {
	return (
		<div className="p-6">
			<ExchangeHistoryList
				history={sampleHistory}
				onAction={(action, item) => console.log(action, item)}
			/>
		</div>
	);
}
