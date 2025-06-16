// import React from "react";
import BarterRequestCard from "../../cards/BarterRequestCard";

import { sessions } from "../../data/sessions";

export default function BarterRequestCardProps() {
	// Filter only barter-type sessions
	const barterRequests = sessions.filter((inf) => inf.tradeType === "barter");

	return (
		<div className="p-4 flex flex-wrap justify-center gap-6">
			{barterRequests.map((inf) => (
				<BarterRequestCard key={inf.id} {...inf} />
			))}
		</div>
	);
}

// export default function BarterRequestCardProps() {
// 	const barterRequests = infs.filter(
// 		(inf) => inf.tradeType === "barter"
// 	);

// 	if (!barterRequests.length) return <p>No barter infs found</p>;

// 	return (
// 		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// 			{barterRequests.map((inf) => (
// 				<div key={inf.id} className="border p-2">
// 					<p>{inf.title}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// }
