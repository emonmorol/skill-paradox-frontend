// components/TrendingSkillCard.jsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Flame } from "lucide-react";

export default function ListingCard(props) {
	const {
		title,
		description,
		imageUrl,
		learners,
		rating,
		category,
		contributor,
	} = props;

	return (
		<Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl transition-shadow">
			<img
				src={imageUrl}
				alt={title}
				className="h-50 w-full object-cover rounded-t-2xl"
			/>
			<CardHeader className="flex flex-col gap-2">
				<Badge
					variant="destructive"
					className="w-fit flex items-center gap-1"
				>
					<Flame className="w-4 h-4" /> Trending
				</Badge>
				<CardTitle className="text-xl font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex items-center justify-between text-sm text-muted-foreground">
					<span>👥 {learners.toLocaleString()} learners</span>
					<span className="flex items-center gap-1">
						<Star className="w-4 h-4 text-yellow-400" />{" "}
						{rating.toFixed(1)}
					</span>
				</div>
				<div className="flex items-center justify-between">
					<Badge variant="secondary">{category}</Badge>
					<div className="flex items-center gap-2">
						<Avatar className="w-6 h-6">
							<AvatarImage
								src={contributor.avatarUrl}
								alt={contributor.name}
							/>
							<AvatarFallback>
								{contributor.name.slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<span className="text-sm">{contributor.name}</span>
					</div>
				</div>
				<Button className="w-full mt-2">Explore</Button>
			</CardContent>
		</Card>
	);
}
