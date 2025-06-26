import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { pricingType, amount, currency } = location.state || {};

	const [isProcessing, setIsProcessing] = useState(false);

	const handlePayment = () => {
		setIsProcessing(true);
		setTimeout(() => {
			alert("Payment Successful!");
			navigate("/");
		}, 2000);
	};

	if (!pricingType || !amount || !currency) {
		return (
			<div className="p-8 text-center">Missing checkout information.</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
			<div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6">
				<h2 className="text-3xl font-bold text-indigo-700">Checkout</h2>
				<p className="text-lg text-gray-700">
					You are about to purchase the{" "}
					<span className="font-semibold">{pricingType}</span>{" "}
					package.
				</p>
				<p className="text-2xl text-gray-900 font-semibold">
					Total: {amount} {currency}
				</p>
				<Button
					onClick={handlePayment}
					className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl text-lg transition-colors"
					disabled={isProcessing}
				>
					{isProcessing ? "Processing..." : "Pay Now"}
				</Button>
				<Button
					variant="outline"
					className="w-full mt-4 border-indigo-600 text-indigo-600 hover:bg-indigo-100 py-3 rounded-xl text-lg"
					onClick={() => navigate(-1)}
				>
					Cancel
				</Button>
			</div>
		</div>
	);
}
