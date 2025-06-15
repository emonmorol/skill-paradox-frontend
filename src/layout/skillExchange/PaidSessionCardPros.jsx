import React from "react";
import BarterRequestCard from "../../cards/BarterRequestCard";
import { sessions } from "../../data/sessions";
// adjust path accordingly

export default function PaidSessionCardProps() {
	const paidSessions = sessions.filter(
		(session) => session.tradeType === "paid"
	);

	return (
		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
			{paidSessions.map((session) => (
				<BarterRequestCard key={session.id} {...session} />
			))}
		</div>
	);
}
