// Stepper.jsx
import { Check } from "lucide-react";
import React from "react";

const steps = [0, 1, 2, 3, 4, 5];
import { cn } from "@/lib/utils";

export default function Stepper({ step, setStep }) {
	return (
		<div className="relative mb-10">
			{/* Base gray line */}
			<div className="absolute top-1/2 left-6 right-6 h-[2px] bg-gray-200 z-0 rounded shadow-sm shadow-gray-400/40" />

			{/* Green progress line */}
			<div
				className="absolute top-1/2 left-6 h-[2px] bg-green-500 z-10 rounded transition-all duration-300"
				style={{
					width: `${((step - 1) / (steps.length - 1)) * 90}%`,
				}}
			/>

			<div className="relative z-20 flex items-center justify-between px-6">
				{steps.map((num) => {
					const isCompleted = step > num;
					const isActive = step === num;

					return (
						<div
							key={num}
							className="relative z-20"
							onClick={() => setStep(num)}
						>
							<div
								className={cn(
									"w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all cursor-pointer border-2",
									isCompleted
										? "bg-green-500 text-white border-green-500"
										: isActive
										? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-400/30"
										: "bg-white border-gray-300 text-gray-500 hover:bg-gray-100"
								)}
							>
								{isCompleted ? (
									<Check className="w-4 h-4" />
								) : (
									num
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
