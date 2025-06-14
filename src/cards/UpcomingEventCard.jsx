// components/UpcomingEventCard.jsx

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function UpcomingEventCard(props) {
	const {
		title,
		description,
		imageUrl,
		date,
		time,
		location,
		host,
		hostAvatarUrl,
	} = props;

	return (
		<Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl transition-shadow">
			<img
				src={imageUrl}
				alt={title}
				className="h-40 w-full object-cover rounded-t-2xl"
			/>
			<CardHeader className="flex flex-col gap-2">
				<Badge className="w-fit flex items-center gap-1">
					<Calendar className="w-4 h-4" /> Upcoming
				</Badge>
				<CardTitle className="text-xl font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="text-sm text-muted-foreground space-y-1">
					<div className="flex items-center gap-2">
						<Calendar className="w-4 h-4" /> <span>{date}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="w-4 h-4" /> <span>{time}</span>
					</div>
					<div className="flex items-center gap-2">
						<MapPin className="w-4 h-4" /> <span>{location}</span>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Avatar className="w-6 h-6">
							<AvatarImage src={hostAvatarUrl} alt={host} />
							<AvatarFallback>{host.slice(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
						<span className="text-sm">{host}</span>
					</div>
					<Button className="text-xs">Join</Button>
				</div>
			</CardContent>
		</Card>
	);
}
