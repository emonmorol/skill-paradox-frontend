"use client";

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandItem,
	CommandEmpty,
	CommandGroup,
} from "@/components/ui/command";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";

const initialSkillOptions = [
	"Frontend Development",
	"Backend Development",
	"Search Engine Optimization",
	"Video Editing",
	"Yoga Instruction",
];
const initialUserOptions = [
	"Abu Bakar",
	"Lara Croft",
	"Tony Stark",
	"Bruce Wayne",
	"Peter Parker",
];
const initialLocationOptions = [
	"Dhaka",
	"Chittagong",
	"Online",
	"Gotham City Studio, Dhaka",
	"Wellness Studio, Dhaka",
];
const initialCategoryOptions = [
	"Programming",
	"Design",
	"Music",
	"Marketing",
	"Business",
	"Creative Arts",
	"Health & Wellness",
];

export default function ListingFilters({ filters, setFilters }) {
	const [filterOptions, setFilterOptions] = useState({
		title: "",
		category: "",
		level: "",
		location: "",
		skill_name: "",
		user_name: "",
		is_in_person_learning: "",
	});

	const [skillOptions, setSkillOptions] = useState(initialSkillOptions);
	const [skillInput, setSkillInput] = useState("");

	const [categoryOptions, setCategoryOptions] = useState(
		initialCategoryOptions
	);
	const [categoryInput, setCategoryInput] = useState("");

	const [userOptions, setUserOptions] = useState(initialUserOptions);
	const [userInput, setUserInput] = useState("");

	const [locationOptions, setLocationOptions] = useState(
		initialLocationOptions
	);
	const [locationInput, setLocationInput] = useState("");

	const handleChange = (field, value) => {
		setFilterOptions((prev) => ({ ...prev, [field]: value }));
	};

	const addAndSelectNewOption = (field, value, setOptions) => {
		setOptions((prev) => [...prev, value]);
		handleChange(field, value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(filterOptions);
		setFilters(filterOptions);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-wrap items-center justify-center gap-4 bg-muted/50 p-4 rounded-xl shadow-sm"
		>
			{/* Title Filter */}
			<div>
				<Input
					type="text"
					placeholder="e.g. React"
					value={filterOptions.title}
					onChange={(e) => handleChange("title", e.target.value)}
				/>
			</div>

			{/* Skill Name */}
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-between"
						>
							{filterOptions.skill_name || "All Skills"}
							<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput
								placeholder="Search skill..."
								value={skillInput}
								onValueChange={setSkillInput}
							/>
							<CommandEmpty>
								{skillInput && (
									<div
										className="p-2 text-sm cursor-pointer hover:bg-muted"
										onClick={() =>
											addAndSelectNewOption(
												"skill_name",
												skillInput,
												setSkillOptions
											)
										}
									>
										Add new: <strong>{skillInput}</strong>
									</div>
								)}
							</CommandEmpty>
							<CommandGroup>
								<CommandItem
									onSelect={() =>
										handleChange("skill_name", "")
									}
								>
									All Skills
								</CommandItem>
								{skillOptions.map((s) => (
									<CommandItem
										key={s}
										onSelect={() =>
											handleChange("skill_name", s)
										}
									>
										{s}
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			{/* Skill Category */}
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-between"
						>
							{filterOptions.category || "All Categories"}
							<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput
								placeholder="Search category..."
								value={categoryInput}
								onValueChange={setCategoryInput}
							/>
							<CommandEmpty>
								{categoryInput && (
									<div
										className="p-2 text-sm cursor-pointer hover:bg-muted"
										onClick={() =>
											addAndSelectNewOption(
												"category",
												categoryInput,
												setCategoryOptions
											)
										}
									>
										Add new:{" "}
										<strong>{categoryInput}</strong>
									</div>
								)}
							</CommandEmpty>
							<CommandGroup>
								<CommandItem
									onSelect={() =>
										handleChange("category", "")
									}
								>
									All Categories
								</CommandItem>
								{categoryOptions.map((cat) => (
									<CommandItem
										key={cat}
										onSelect={() =>
											handleChange("category", cat)
										}
									>
										{cat}
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			{/* Instructor Name */}
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-between"
						>
							{filterOptions.user_name || "All Instructors"}
							<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput
								placeholder="Search instructor..."
								value={userInput}
								onValueChange={setUserInput}
							/>
							<CommandEmpty>
								{userInput && (
									<div
										className="p-2 text-sm cursor-pointer hover:bg-muted"
										onClick={() =>
											addAndSelectNewOption(
												"user_name",
												userInput,
												setUserOptions
											)
										}
									>
										Add new: <strong>{userInput}</strong>
									</div>
								)}
							</CommandEmpty>
							<CommandGroup>
								<CommandItem
									onSelect={() =>
										handleChange("user_name", "")
									}
								>
									All Instructors
								</CommandItem>
								{userOptions.map((u) => (
									<CommandItem
										key={u}
										onSelect={() =>
											handleChange("user_name", u)
										}
									>
										{u}
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			{/* Location */}
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-between"
						>
							{filterOptions.location || "All Locations"}
							<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput
								placeholder="Search location..."
								value={locationInput}
								onValueChange={setLocationInput}
							/>
							<CommandEmpty>
								{locationInput && (
									<div
										className="p-2 text-sm cursor-pointer hover:bg-muted"
										onClick={() =>
											addAndSelectNewOption(
												"location",
												locationInput,
												setLocationOptions
											)
										}
									>
										Add new:{" "}
										<strong>{locationInput}</strong>
									</div>
								)}
							</CommandEmpty>
							<CommandGroup>
								<CommandItem
									onSelect={() =>
										handleChange("location", "")
									}
								>
									All Locations
								</CommandItem>
								{locationOptions.map((loc) => (
									<CommandItem
										key={loc}
										onSelect={() =>
											handleChange("location", loc)
										}
									>
										{loc}
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			{/* Level */}
			<div>
				<Select
					onValueChange={(val) =>
						handleChange("level", val === "all" ? "" : val)
					}
					value={filterOptions.level || ""}
				>
					<SelectTrigger>
						<SelectValue placeholder="All Levels" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="beginner">Beginner</SelectItem>
						<SelectItem value="intermediate">
							Intermediate
						</SelectItem>
						<SelectItem value="expert">Expert</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Session Type */}
			<div>
				<Select
					onValueChange={(val) =>
						handleChange(
							"is_in_person_learning",
							val === "all" ? "" : val
						)
					}
					value={filterOptions.is_in_person_learning || ""}
				>
					<SelectTrigger>
						<SelectValue placeholder="All Modes" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="1">In-Person</SelectItem>
						<SelectItem value="0">Online</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Submit Button */}
			<div className="flex justify-center h-full w-full">
				<Button
					type="submit"
					variant="modern"
					className="from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-100 text-black w-3/4"
				>
					Filter
				</Button>
			</div>
		</form>
	);
}
