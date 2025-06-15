// import React from "react";
// import BarterRequestCard from "../../cards/BarterRequestCard";

import { sessions } from "../../data/sessions";


// import { sessions } from "../../data/sessions";

// export default function BarterRequestCardProps() {
// 	// Filter only barter-type sessions
// 	const barterRequests = sessions.filter(
// 		(session) => session.tradeType === "barter"
// 	);

// 	return (
// 		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
// 			{barterRequests.map((session) => (
// 				<BarterRequestCard key={session.id} {...session} />
// 			))}
// 		</div>
// 	);
// }

export default function BarterRequestCardProps() {
	const barterRequests = sessions.filter(
		(session) => session.tradeType === "barter"
	);

	if (!barterRequests.length) return <p>No barter sessions found</p>;

	return (
		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
			{barterRequests.map((session) => (
				<div key={session.id} className="border p-2">
					<p>{session.title}</p>
				</div>
			))}
		</div>
	);
}
