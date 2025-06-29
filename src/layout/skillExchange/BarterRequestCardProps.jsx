import React, { useEffect, useState } from "react";
import BarterRequestCard from "../../cards/BarterRequestCard";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";

// Mock: Replace with actual API data or props
// const tradeRequests = [
// 	{
// 		trade_request_id: 5,
// 		enrollment_id: 18,
// 		requester_id: 4,
// 		request_time: "2025-06-27T20:43:08.000Z",
// 		requester: {
// 			id: 4,
// 			name: "Peter Parker",
// 			email: "peter@gmail.com",
// 			avatar: "",
// 		},
// 		target_listing_id: 2,
// 		pricing_type: "trade",
// 		target_listing: {
// 			id: 2,
// 			title: "Mastering Skill 9 Fundamentals",
// 			skill: {
// 				id: 9,
// 				name: "Fitness Coaching",
// 				category: "Health & Wellness",
// 			},
// 		},
// 		offered_listing_id: 4,
// 		offered_listing: {
// 			id: 4,
// 			title: "Mastering Skill 6 Fundamentals",
// 			skill: {
// 				id: 6,
// 				name: "Graphic Design",
// 				category: "Design",
// 			},
// 		},
// 		status: "pending",
// 	},
// 	{
// 		trade_request_id: 6,
// 		enrollment_id: 19,
// 		requester_id: 4,
// 		request_time: "2025-06-27T20:43:39.000Z",
// 		requester: {
// 			id: 4,
// 			name: "Peter Parker",
// 			email: "peter@gmail.com",
// 			avatar: "",
// 		},
// 		target_listing_id: 2,
// 		pricing_type: "semi_trade",
// 		target_listing: {
// 			id: 2,
// 			title: "Mastering Skill 9 Fundamentals",
// 			skill: {
// 				id: 9,
// 				name: "Fitness Coaching",
// 				category: "Health & Wellness",
// 			},
// 		},
// 		offered_listing_id: 4,
// 		offered_listing: {
// 			id: 4,
// 			title: "Mastering Skill 6 Fundamentals",
// 			skill: {
// 				id: 6,
// 				name: "Graphic Design",
// 				category: "Design",
// 			},
// 		},
// 		status: "pending",
// 	},
// ];
export default function BarterRequestCardProps() {
	const { user } = useAuth();
	const [tradeRequests, setTradeRequests] = useState([]);
	useEffect(() => {
		const fetchTradeRequests = async () => {
			try {
				if (user?.id) {
					const res = await axiosInstance.get(
						`/barter/requests/${user.id}`
					);
					setTradeRequests(res.data.data);
				}
			} catch (error) {
				console.error("Failed to fetch trade requests:", error);
			}
		};
		fetchTradeRequests();
	}, [user]);

	// console.log(tradeRequests);
	return (
		<div className="p-4 flex flex-wrap gap-6">
			{tradeRequests.length !== 0 ? (
				tradeRequests.map((request) => (
					<BarterRequestCard
						key={request.trade_request_id}
						id={request.trade_request_id}
						status={request.status}
						request_time={request.request_time}
						pricing_type={request.pricing_type}
						requester={request.requester}
						target_listing={request.target_listing}
						offered_listing={request.offered_listing}
						isIncoming={true}
					/>
				))
			) : (
				<div className="w-full h-full flex justify-center items-center">
					<h1>No Request Exist</h1>
				</div>
			)}
		</div>
	);
}
