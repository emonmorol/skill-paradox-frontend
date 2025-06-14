import React from "react";
import ListingCard from "../../Cards/ListingCard";

function ListingCardProps() {
	return (
		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			<ListingCard
				title="Web Development"
				description="Build modern websites with HTML, CSS, and JS."
				imageUrl="/images/web-dev.jpg"
				learners={12300}
				rating={4.8}
				category="Technology"
				contributor={{
					name: "Ayesha Rahman",
					avatarUrl: "/avatars/ayesha.png",
				}}
			/>
		</div>
	);
}

export default ListingCardProps;
