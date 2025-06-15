// components/ListingSection/ListingCardProps.jsx

import React from "react";
import ListingCard from "../../Cards/ListingCard";

function ListingCardProps() {
	const listings = [
		{
			id: 1,
			user_id: 101,
			skill_id: 10,
			title: "Web Development",
			description:
				"Build modern, responsive websites with HTML, CSS, and JS.",
			proficiency_level: "beginner",
			banner: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			is_deleted: false,
			is_in_person_learning: true,
			location: "Dhaka, Bangladesh",
			learners: 12300,
			rating: 4.8,
			contributor: {
				name: "Ayesha Rahman",
				avatarUrl: "/avatars/ayesha.png",
			},
			created_at: "2025-04-01T12:00:00Z",
			updated_at: "2025-04-15T08:00:00Z",
		},
		{
			id: 2,
			user_id: 102,
			skill_id: 12,
			title: "Graphic Design",
			description:
				"Master Photoshop, Illustrator, and creative design principles.",
			proficiency_level: "intermediate",
			banner: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
			is_deleted: false,
			is_in_person_learning: false,
			location: null,
			learners: 9800,
			rating: 4.5,
			contributor: {
				name: "Rana Hossain",
				avatarUrl: "/avatars/rana.png",
			},
			created_at: "2025-03-20T09:30:00Z",
			updated_at: "2025-04-10T11:15:00Z",
		},
		{
			id: 3,
			user_id: 103,
			skill_id: 15,
			title: "Data Science Basics",
			description:
				"Learn data analysis, visualization, and basic ML concepts.",
			proficiency_level: "expert",
			banner: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
			is_deleted: false,
			is_in_person_learning: true,
			location: "Online & Dhaka",
			learners: 15000,
			rating: 4.9,
			contributor: {
				name: "Fatema Begum",
				avatarUrl: "/avatars/fatema.png",
			},
			created_at: "2025-02-25T14:20:00Z",
			updated_at: "2025-05-01T07:45:00Z",
		},
		{
			id: 4,
			user_id: 104,
			skill_id: 18,
			title: "Photography Masterclass",
			description:
				"Advanced techniques for portrait and landscape photography.",
			proficiency_level: "expert",
			banner: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
			is_deleted: false,
			is_in_person_learning: false,
			location: "Online",
			learners: 7600,
			rating: 4.7,
			contributor: {
				name: "Arif Rahman",
				avatarUrl: "/avatars/arif.png",
			},
			created_at: "2025-04-05T10:00:00Z",
			updated_at: "2025-04-20T09:00:00Z",
		},
	];

	return (
		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
			{listings.map((listing) => (
				<ListingCard
					key={listing.id}
					title={listing.title}
					description={listing.description}
					imageUrl={listing.banner}
					learners={listing.learners}
					rating={listing.rating}
					category={listing.proficiency_level}
					contributor={listing.contributor}
					location={listing.location}
					isInPerson={listing.is_in_person_learning}
					createdAt={listing.created_at}
					updatedAt={listing.updated_at}
				/>
			))}
		</div>
	);
}

export default ListingCardProps;
