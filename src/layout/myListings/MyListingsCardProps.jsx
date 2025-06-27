import { useEffect, useState } from "react";
import ListingCard from "../../cards/ListingCard";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";

function MyListingsCardProps() {
	const [listings, setListings] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const res = await axiosInstance.get("/listings/my");
				setListings(res.data.data);
			} catch (error) {
				if (error.name !== "CanceledError") {
					console.error("Failed to fetch listings:", error);
				}
			}
		};

		fetchListings();
	}, []);

	return (
		<div className="p-4 space-y-6">
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
							name: user.name,
							email: user.email,
							avatarUrl: user.profile_picture,
						}}
						location={listing.location}
						isInPerson={listing.is_in_person_learning}
					/>
				))}
			</div>
		</div>
	);
}

export default MyListingsCardProps;
