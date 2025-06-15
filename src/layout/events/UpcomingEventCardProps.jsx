// components/EventSection/UpcomingEventList.jsx

import UpcomingEventCard from "../../cards/UpcomingEventCard";

function UpcomingEventCardProps() {
	const upcomingEvents = [
		{
			title: "Skill Share Meetup",
			description:
				"Collaborate, teach and learn with like-minded individuals.",
			imageUrl:
				"https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80",
			date: "July 20, 2025",
			time: "3:00 PM - 5:00 PM",
			location: "Zoom",
			host: "Abu Bakar",
			hostAvatarUrl: "/avatars/arefin.png",
		},
		{
			title: "React Workshop",
			description:
				"Hands-on workshop for beginner to intermediate React learners.",
			imageUrl:
				"https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80",
			date: "August 5, 2025",
			time: "7:00 PM - 9:00 PM",
			location: "Google Meet",
			host: "Emon Moral",
			hostAvatarUrl: "/avatars/mehedi.png",
		},
		{
			title: "Photography Basics",
			description:
				"Learn fundamentals of photography from exposure to composition.",
			imageUrl:
				"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
			date: "August 15, 2025",
			time: "1:00 PM - 4:00 PM",
			location: "In-Person (City Hall)",
			host: "Sarah Khan",
			hostAvatarUrl: "/avatars/sarah.png",
		},
		{
			title: "Digital Marketing 101",
			description:
				"Introduction to digital marketing strategies and tools.",
			imageUrl:
				"https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
			date: "September 1, 2025",
			time: "5:00 PM - 7:00 PM",
			location: "Zoom",
			host: "Rajib Hossain",
			hostAvatarUrl: "/avatars/rajib.png",
		},
		{
			title: "Yoga for Beginners",
			description:
				"A calming yoga session focusing on posture and breathing.",
			imageUrl:
				"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
			date: "September 10, 2025",
			time: "6:30 AM - 7:30 AM",
			location: "Community Center",
			host: "Maya Das",
			hostAvatarUrl: "/avatars/maya.png",
		},
	];
	return (
		<div className="container mx-auto p-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px]">
				{upcomingEvents.map((event, index) => (
					<UpcomingEventCard
						key={index}
						title={event.title}
						description={event.description}
						imageUrl={event.imageUrl}
						date={event.date}
						time={event.time}
						location={event.location}
						host={event.host}
						hostAvatarUrl={event.hostAvatarUrl}
					/>
				))}
			</div>
		</div>
	);
}

export default UpcomingEventCardProps;
