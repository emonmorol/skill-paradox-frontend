import React from "react";
import BarterRequestCard from "../../cards/BarterRequestCard";

export default function BarterRequestCardProps() {
	const infos = [
		{
			id: 1,
			title: "Web Development Exchange",
			skillName: "HTML, CSS, JavaScript",
			skillCategory: "Web Development",
			proficiencyLevel: "intermediate",
			description:
				"Let's exchange frontend techniques and responsive design tricks.",
			date: "2025-06-20",
			time: "10:00 AM",
			status: "pending",
			counterparty: "John Doe",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/men/32.jpg",
			isIncoming: true,
			isInPersonLearning: false,
			location: null,
			price: null,
			currency: "USD",
			tradeType: "barter",
			tags: ["frontend", "responsive", "javascript"],
		},
		{
			id: 2,
			title: "Graphic Design Trade",
			skillName: "Photoshop, Illustrator",
			skillCategory: "Design",
			proficiencyLevel: "expert",
			description: "Swap high-end design tips and branding techniques.",
			date: "2025-06-21",
			time: "2:00 PM",
			status: "accepted",
			counterparty: "Sara Khan",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/women/44.jpg",
			isIncoming: false,
			isInPersonLearning: true,
			location: "Gulshan, Dhaka",
			price: null,
			currency: "USD",
			tradeType: "barter",
			tags: ["branding", "photoshop"],
		},
		{
			id: 3,
			title: "Paid Session: Advanced React",
			skillName: "React.js",
			skillCategory: "Web Development",
			proficiencyLevel: "expert",
			description:
				"Deep dive into hooks, context, and performance optimizations.",
			date: "2025-06-23",
			time: "3:00 PM",
			status: "completed",
			counterparty: "Lisa Morgan",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/women/68.jpg",
			isIncoming: false,
			isInPersonLearning: false,
			location: null,
			price: 50,
			currency: "USD",
			tradeType: "paid",
			tags: ["react", "hooks", "performance"],
		},
		{
			id: 4,
			title: "Photography Skills Swap",
			skillName: "Portrait & Landscape",
			skillCategory: "Creative Arts",
			proficiencyLevel: "beginner",
			description:
				"Learn to shoot with natural light and basic editing techniques.",
			date: "2025-06-25",
			time: "11:00 AM",
			status: "pending",
			counterparty: "Nabila Rahman",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/women/55.jpg",
			isIncoming: false,
			isInPersonLearning: true,
			location: "Dhanmondi Lake Park",
			price: null,
			currency: "USD",
			tradeType: "barter",
			tags: ["photography", "portrait", "landscape"],
		},
		{
			id: 5,
			title: "Paid Session: Data Science Masterclass",
			skillName: "Python, Machine Learning",
			skillCategory: "Data Science",
			proficiencyLevel: "expert",
			description:
				"Master regression, clustering, and basic model deployment.",
			date: "2025-06-26",
			time: "1:00 PM",
			status: "pending",
			counterparty: "Farhan Ahmed",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/men/77.jpg",
			isIncoming: true,
			isInPersonLearning: false,
			location: null,
			price: 75,
			currency: "USD",
			tradeType: "paid",
			tags: ["python", "machine learning"],
		},
		{
			id: 6,
			title: "Mobile App Development Exchange",
			skillName: "Flutter, Dart",
			skillCategory: "Mobile Development",
			proficiencyLevel: "intermediate",
			description: "Let’s build a demo app with custom animations.",
			date: "2025-07-01",
			time: "9:00 AM",
			status: "accepted",
			counterparty: "Rahim Uddin",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/men/10.jpg",
			isIncoming: true,
			isInPersonLearning: false,
			location: null,
			price: null,
			currency: "USD",
			tradeType: "barter",
			tags: ["flutter", "dart", "mobile"],
		},
		{
			id: 7,
			title: "Paid Session: UI/UX Design Essentials",
			skillName: "Figma, Adobe XD",
			skillCategory: "Design",
			proficiencyLevel: "intermediate",
			description:
				"Understand user flows, wireframes, and interactive prototyping.",
			date: "2025-07-02",
			time: "4:00 PM",
			status: "pending",
			counterparty: "Amina Sultana",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/women/25.jpg",
			isIncoming: false,
			isInPersonLearning: false,
			location: null,
			price: 40,
			currency: "USD",
			tradeType: "paid",
			tags: ["ui", "ux", "figma"],
		},
		{
			id: 8,
			title: "Barter: Social Media Marketing",
			skillName: "SEO, Content Strategy",
			skillCategory: "Marketing",
			proficiencyLevel: "intermediate",
			description:
				"Exchange content planning templates and Instagram growth hacks.",
			date: "2025-07-04",
			time: "10:30 AM",
			status: "rejected",
			counterparty: "Hasan Ali",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/men/43.jpg",
			isIncoming: false,
			isInPersonLearning: true,
			location: "Banani Club, Dhaka",
			price: null,
			currency: "USD",
			tradeType: "barter",
			tags: ["seo", "content", "marketing"],
		},
		{
			id: 9,
			title: "Paid Session: Python Automation",
			skillName: "Python, Selenium",
			skillCategory: "Automation",
			proficiencyLevel: "intermediate",
			description: "Learn to automate form submissions and web scraping.",
			date: "2025-07-05",
			time: "2:00 PM",
			status: "completed",
			counterparty: "Nadia Chowdhury",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/women/39.jpg",
			isIncoming: true,
			isInPersonLearning: false,
			location: null,
			price: 45,
			currency: "USD",
			tradeType: "paid",
			tags: ["python", "selenium", "automation"],
		},
		{
			id: 10,
			title: "Barter: Video Editing Basics",
			skillName: "Premiere Pro, After Effects",
			skillCategory: "Multimedia",
			proficiencyLevel: "beginner",
			description:
				"Cut clips, add transitions, and render in high quality.",
			date: "2025-07-06",
			time: "1:00 PM",
			status: "pending",
			counterparty: "Kamrul Hasan",
			counterpartyAvatarUrl:
				"https://randomuser.me/api/portraits/men/52.jpg",
			isIncoming: false,
			isInPersonLearning: true,
			location: "Studio 71, Bashundhara",
			price: null,
			currency: "USD",
			tradeType: "barter",
			tags: ["video", "editing", "premiere"],
		},
	];

	return (
		<div className="p-4 flex flex-wrap gap-6">
			{infos.map((info) => (
				<BarterRequestCard key={info.id} {...info} />
			))}
		</div>
	);
}

// export default function BarterRequestCardProps() {
// 	const barterRequests = infs.filter(
// 		(inf) => inf.tradeType === "barter"
// 	);

// 	if (!barterRequests.length) return <p>No barter infs found</p>;

// 	return (
// 		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// 			{barterRequests.map((inf) => (
// 				<div key={inf.id} className="border p-2">
// 					<p>{inf.title}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// }
