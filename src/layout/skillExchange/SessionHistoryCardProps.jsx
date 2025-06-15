import React from "react";
import BarterRequestCard from "../../cards/BarterRequestCard";
import { sessions } from "../../data/sessions"; // Adjust the path if needed

export default function SessionHistoryCardProps() {
	// Sort sessions by date (newest first)
	const sortedSessions = [...sessions].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	return (
		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{sortedSessions.map((session) => (
				<BarterRequestCard key={session.id} {...session} />
			))}
		</div>
	);
}
