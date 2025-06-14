import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function ListingInformation({ listing, setListing }) {
	return (
		<Card className="w-full max-w-3xl mx-auto shadow-xl border border-gray-200 dark:border-gray-800">
			<CardContent className="p-6 space-y-6">
				<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
					Listing Information
				</h2>

				{/* Title */}
				<div className="space-y-1.5">
					<Label htmlFor="title">Title *</Label>
					<Input
						id="title"
						placeholder="Skill title"
						value={listing.title}
						onChange={(e) =>
							setListing({ ...listing, title: e.target.value })
						}
					/>
				</div>

				{/* Description */}
				<div className="space-y-1.5">
					<Label htmlFor="description">Description *</Label>
					<Textarea
						id="description"
						placeholder="Describe your skill"
						rows={4}
						value={listing.description}
						onChange={(e) =>
							setListing({
								...listing,
								description: e.target.value,
							})
						}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-6">
					{/* Proficiency Level */}
					<div className="flex-1 space-y-1.5">
						<Label htmlFor="proficiency">Proficiency Level *</Label>
						<Select
							value={listing.proficiency_level}
							onValueChange={(value) =>
								setListing({
									...listing,
									proficiency_level: value,
								})
							}
						>
							<SelectTrigger id="proficiency">
								<SelectValue placeholder="Select level" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="beginner">
									Beginner
								</SelectItem>
								<SelectItem value="intermediate">
									Intermediate
								</SelectItem>
								<SelectItem value="expert">Expert</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* In-person Checkbox */}
					<div className="flex items-center mt-1 md:mt-6 gap-3">
						<Checkbox
							id="inPerson"
							checked={listing.is_in_person_learning}
							onCheckedChange={(checked) =>
								setListing({
									...listing,
									is_in_person_learning: !!checked,
									location: "",
								})
							}
						/>
						<Label htmlFor="inPerson" className="mt-0.5">
							Is this in-person learning?
						</Label>
					</div>
				</div>

				{/* Location input */}
				{listing.is_in_person_learning && (
					<div className="space-y-1.5">
						<Label htmlFor="location">Location</Label>
						<Input
							id="location"
							placeholder="Where will this take place?"
							value={listing.location || ""}
							onChange={(e) =>
								setListing({
									...listing,
									location: e.target.value,
								})
							}
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
