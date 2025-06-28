import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();

	const {
		creditHour,
		currency,
		is_available,
		listing_id,
		listingTitle,
		contributor,
		pricing_type,
		amount,
	} = location.state || {};

	const [isProcessing, setIsProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [offeredListingId, setOfferedListingId] = useState(0);
	const [userListings, setUserListings] = useState([]);

	useEffect(() => {
		if (pricing_type === "semi_trade" || pricing_type === "trade") {
			const fetchListings = async () => {
				try {
					const res = await axiosInstance.get("/listings/my");
					setUserListings(res.data.data);
				} catch (error) {
					if (error.name !== "CanceledError") {
						console.error("Failed to fetch listings:", error);
					}
				}
			};

			fetchListings();
		}
	}, [pricing_type]);

	const handlePayment = async () => {
		console.log({
			transactionId,
			phoneNumber,
			offeredListingId,
			pricing_type,
			listing_id,
			user_id: user.id,
			credit_hours_remaining: creditHour,
			amount,
			currency,
		});
		if (
			(pricing_type === "paid" || pricing_type === "semi_trade") &&
			(!transactionId.trim() || !phoneNumber.trim())
		) {
			alert("Please fill out Transaction ID and Phone Number.");
			return;
		}

		if (
			(pricing_type === "semi_trade" || pricing_type === "trade") &&
			!offeredListingId
		) {
			alert("Please select a course to offer.");
			return;
		}

		setIsProcessing(true);

		const payload = {
			transaction_id: transactionId,
			phone_number: phoneNumber,
			offered_listing_id: Number(offeredListingId),
			pricing_type,
			listing_id,
			user_id: user.id,
			credit_hours_remaining: creditHour,
			amount,
			currency,
		};

		try {
			await axiosInstance.post("/barter/enroll", payload);
			Swal.fire({
				title: "Enrolled",
				text: "Payment and Enrollment complete!",
				icon: "success",
				confirmButtonText: "Alhamdulillah",
			});
			navigate("/my-schedule");
		} catch (error) {
			console.error(error);
			Swal.fire("Error", "Failed to enroll", "error");
		} finally {
			setIsProcessing(false);
		}
	};

	if (
		!creditHour ||
		!currency ||
		!is_available ||
		!listing_id ||
		!pricing_type
	) {
		return (
			<div className="p-8 text-center text-red-600 text-xl font-semibold">
				Missing checkout information. Please go back and try again.
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-12">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 p-10 md:p-14 grid md:grid-cols-2 gap-12"
			>
				{/* Left - Course Details */}
				<motion.div
					initial={{ x: -50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="space-y-6"
				>
					<h2 className="text-4xl font-extrabold text-indigo-800">
						🚀 Checkout
					</h2>
					<p className="text-gray-700 text-lg">
						You're enrolling in:
					</p>
					<div className="bg-white/60 p-6 rounded-2xl shadow-md space-y-2 border border-gray-200">
						<h3 className="text-2xl font-semibold text-indigo-800">
							{listingTitle}
						</h3>
						<p className="text-gray-600 text-lg">
							By {contributor}
						</p>
						<p className="text-gray-600">
							⏳ {creditHour} Credit Hours
						</p>
						<p className="text-gray-600 capitalize">
							Type:{" "}
							<span className="font-semibold">
								{pricing_type}
							</span>
						</p>
					</div>
					<p className="text-sm text-gray-500">
						💡 After completing payment, your learning journey
						begins instantly!
					</p>
				</motion.div>

				{/* Right - Payment & Input */}
				<motion.div
					initial={{ x: 50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="space-y-6"
				>
					{/* Payment Summary */}
					{pricing_type !== "trade" && (
						<div className="bg-gradient-to-r from-indigo-100 via-white to-purple-100 rounded-2xl p-6 shadow-inner space-y-5 border border-indigo-200">
							<h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
								<CreditCard className="w-6 h-6" /> Payment
								Summary
							</h3>
							<div className="flex justify-between text-gray-800 text-lg">
								<span>Subtotal</span>
								<span>
									{amount.toFixed(2)} {currency}
								</span>
							</div>
							<div className="flex justify-between text-gray-700 text-lg">
								<span>VAT (5%)</span>
								<span>
									{(amount * 0.05).toFixed(2)} {currency}
								</span>
							</div>
							<hr />
							<div className="flex justify-between text-indigo-700 text-xl font-bold">
								<span>Total</span>
								<span>
									{(amount * 1.05).toFixed(2)} {currency}
								</span>
							</div>
						</div>
					)}

					{/* Input Fields */}
					<div className="space-y-4">
						{(pricing_type === "paid" ||
							pricing_type === "semi_trade") && (
							<>
								<div>
									<label
										htmlFor="transactionId"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Transaction ID
									</label>
									<input
										type="text"
										id="transactionId"
										placeholder="Enter transaction/reference ID"
										value={transactionId}
										onChange={(e) =>
											setTransactionId(e.target.value)
										}
										className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
									/>
								</div>

								<div>
									<label
										htmlFor="phoneNumber"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Phone Number
									</label>
									<input
										type="tel"
										id="phoneNumber"
										placeholder="Enter your phone number"
										value={phoneNumber}
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
										className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
									/>
								</div>
							</>
						)}

						{(pricing_type === "semi_trade" ||
							pricing_type === "trade") && (
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Offer Your Course in Exchange
								</label>
								<Select
									value={offeredListingId}
									onValueChange={setOfferedListingId}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a course to offer" />
									</SelectTrigger>
									<SelectContent>
										{userListings.map((listing) => (
											<SelectItem
												key={listing.id}
												value={listing.id.toString()}
											>
												{listing.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}
					</div>

					{/* Action Buttons */}
					<motion.button
						onClick={handlePayment}
						disabled={isProcessing}
						whileTap={{ scale: 0.95 }}
						className={`w-full text-white text-lg font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
							isProcessing
								? "bg-gray-400 cursor-wait"
								: "bg-indigo-600 hover:bg-indigo-700"
						}`}
					>
						{isProcessing ? (
							<>
								<Loader2 className="h-5 w-5 animate-spin" />
								Processing...
							</>
						) : (
							"Confirm Enrollment"
						)}
					</motion.button>

					<button
						onClick={() => navigate(-1)}
						className="w-full mt-2 text-indigo-700 font-medium border border-indigo-300 rounded-xl py-2 hover:bg-indigo-100 transition"
					>
						Cancel
					</button>
				</motion.div>
			</motion.div>
		</div>
	);
}
