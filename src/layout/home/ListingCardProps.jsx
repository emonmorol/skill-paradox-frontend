"use client";

import React, { useEffect, useState } from "react";
import ListingCard from "../../cards/ListingCard";
import ListingFilters from "./ListingFilters";
import axiosInstance from "@/utils/axiosInstance";

function ListingCardProps() {
	const [listings, setListings] = useState([]);
	const [filters, setFilters] = useState({
		title: "",
		category: "",
		level: "",
		location: "",
		skill_name: "",
		user_name: "",
		is_in_person_learning: "",
	});

	useEffect(() => {
		const controller = new AbortController();
		const fetchListings = async () => {
			try {
				const res = await axiosInstance.get("/listings", {
					params: filters,
					signal: controller.signal,
				});
				setListings(res.data.data);
			} catch (error) {
				if (error.name !== "CanceledError") {
					console.error("Failed to fetch listings:", error);
				}
			}
		};

		fetchListings();

		return () => controller.abort();
	}, [
		filters.title,
		filters.category,
		filters.level,
		filters.location,
		filters.skill_name,
		filters.user_name,
		filters.is_in_person_learning,
		filters,
	]);

	return (
		<div className="p-4 space-y-6">
			<ListingFilters filters={filters} setFilters={setFilters} />

			<div className="flex flex-wrap justify-center gap-6">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						id={listing.id}
						title={listing.title}
						description={listing.description}
						imageUrl={listing.banner}
						learners={1298}
						rating={5}
						category={listing.proficiency_level}
						contributor={{
							name: listing.user_name,
							email: listing.user_email,
							avatarUrl: listing.user_avatar,
						}}
						location={listing.location}
						isInPerson={listing.is_in_person_learning}
					/>
				))}
			</div>
		</div>
	);
}

export default ListingCardProps;
