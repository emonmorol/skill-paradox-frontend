// components/AlertCard.jsx

"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function AlertCard(props) {
	const {
		type = "success",
		title,
		message,
		timeout = 2000, // default 3 sec
	} = props;

	const [visible, setVisible] = useState(true);
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		if (!timeout) return;

		const start = Date.now();
		const interval = setInterval(() => {
			const elapsed = Date.now() - start;
			const percent = Math.max(0, 100 - (elapsed / timeout) * 100);
			setProgress(percent);
			if (percent === 0) {
				setVisible(false);
				clearInterval(interval);
			}
		}, 50);

		return () => clearInterval(interval);
	}, [timeout]);

	if (!visible) return null;

	const isSuccess = type === "success";
	const icon = isSuccess ? (
		<CheckCircle className="text-green-600 w-5 h-5" />
	) : (
		<AlertCircle className="text-red-600 w-5 h-5" />
	);
	const bgClass = isSuccess
		? "bg-green-50 border-green-600"
		: "bg-red-50 border-red-600";
	const textClass = isSuccess ? "text-green-800" : "text-red-800";
	const progressColor = isSuccess ? "bg-green-500" : "bg-red-500";

	return (
		<div
			className={`relative w-full border-l-4 ${bgClass} p-4 rounded-lg shadow-sm`}
		>
			{/* Dismiss button */}
			<button
				className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
				onClick={() => setVisible(false)}
			>
				<X className="w-4 h-4" />
			</button>

			{/* Content */}
			<div className="flex items-start gap-3">
				<div className="pt-1">{icon}</div>
				<div className="space-y-1">
					<h3 className={`text-base font-semibold ${textClass}`}>
						{title}
					</h3>
					<p className="text-sm text-gray-700">{message}</p>
				</div>
			</div>

			{/* Progress Bar */}
			{timeout > 0 && (
				<div className="mt-3 h-1 w-full bg-gray-200 rounded">
					<div
						className={`h-full rounded transition-all duration-100 ${progressColor}`}
						style={{ width: `${progress}%` }}
					></div>
				</div>
			)}
		</div>
	);
}
