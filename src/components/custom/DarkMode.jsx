import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function DarkMode() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const html = document.documentElement;
		if (isDark) {
			html.classList.add("dark");
		} else {
			html.classList.remove("dark");
		}
	}, [isDark]);

	const toggleDarkMode = () => setIsDark((prev) => !prev);

	return (
		<>
			{/* 🌗 Toggle Switch with Icon */}
			<div className="flex justify-end">
				<label className="inline-flex items-center cursor-pointer">
					<span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
						{isDark ? "Dark" : "Light"} Mode
					</span>
					<div
						className={`relative w-12 h-6 rounded-full transition ${
							isDark ? "bg-gray-600" : "bg-gray-300"
						}`}
						onClick={toggleDarkMode}
					>
						<div
							className={`absolute top-0 left-0 h-6 w-6 flex items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
								isDark ? "translate-x-6" : "translate-x-0"
							}`}
						>
							{isDark ? (
								<Moon className="w-4 h-4 text-yellow-400" />
							) : (
								<Sun className="w-4 h-4 text-orange-500" />
							)}
						</div>
					</div>
				</label>
			</div>
		</>
	);
}

export default DarkMode;
