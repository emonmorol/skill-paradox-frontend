// components/PropsExample/AlertCardProps.jsx

import React from "react";
import AlertCard from "../../cards/AlertCard";

function AlertCardProps() {
	const dbAlert = {
		type: "error",
		title: "Login Failed",
		message: "Invalid username or password.",
		timeout: 3000, // Custom time from DB (e.g. 5 seconds)
	};

	return (
		<div className="p-6 space-y-6 max-w-xl mx-auto">
			<AlertCard
				type="success"
				title="Profile Updated"
				message="Your changes have been saved successfully."
				timeout={3000}
			/>

			<AlertCard
				type={dbAlert.type}
				title={dbAlert.title}
				message={dbAlert.message}
				timeout={dbAlert.timeout}
			/>
		</div>
	);
}

export default AlertCardProps;
