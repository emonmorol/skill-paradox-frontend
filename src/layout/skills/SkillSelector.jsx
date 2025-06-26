"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import axiosInstance from "../../utils/axiosInstance";

function SkillSelector({ setStep, setSkillId, listing }) {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedSkill, setSelectedSkill] = useState(null);
	const [allCategories, setAllCategories] = useState([]);
	const [allSkills, setAllSkills] = useState([]);
	const [filteredSkills, setFilteredSkills] = useState([]);
	const [isCreated, setIsCreated] = useState(false);

	const [catInput, setCatInput] = useState("");
	const [skillInput, setSkillInput] = useState("");
	const [openCat, setOpenCat] = useState(false);
	const [openSkill, setOpenSkill] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [catRes, skillRes] = await Promise.all([
					axiosInstance.get("/skills/categories"),
					axiosInstance.get("/skills"),
				]);

				setAllCategories(catRes.data.data); // Ex: [{ category: "Programming", skill_count: 5 }, ...]
				setAllSkills(skillRes.data.data); // Ex: [{ id, name, category }, ...]
			} catch (error) {
				console.error("Error loading skill data:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (selectedCategory) {
			const filtered = allSkills.filter(
				(skill) => skill.category === selectedCategory.category
			);
			setFilteredSkills(filtered);
		} else {
			setFilteredSkills([]);
		}
	}, [selectedCategory, allSkills]);

	const handleCategoryCreate = (name) => {
		const newCategory = {
			category: name,
			skill_count: 1,
		};
		setIsCreated(true);
		setAllCategories((prev) => [...prev, newCategory]);
		setSelectedCategory(newCategory);
		setCatInput("");
		setOpenCat(false);
	};

	const handleSkillCreate = async (name) => {
		const newSkill = {
			name,
			category: selectedCategory.category,
		};
		setIsCreated(true);
		setAllSkills((prev) => [...prev, newSkill]);
		setSelectedSkill(newSkill);
		setSkillInput("");
		setOpenSkill(false);
	};

	const onEnterHandler = async () => {
		try {
			if (isCreated) {
				const res = await axiosInstance.post("/skills/create-skill", {
					name: selectedSkill?.name,
					category: selectedSkill?.category,
				});
				setSelectedSkill(res.data.data);
				setSkillId(res.data.data.id);
				listing.skill_id = res.data.data.id;
			} else {
				setSelectedSkill(selectedSkill);
				setSkillId(selectedSkill.id);
				listing.skill_id = selectedSkill.id;
			}
			setIsCreated(false);
			setStep(1);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="space-y-6">
			{/* Category Selector */}
			<div>
				<label className="block mb-2 font-medium">
					Select Category
				</label>
				<Popover open={openCat} onOpenChange={setOpenCat}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							className="w-full justify-between"
						>
							{selectedCategory?.category ??
								"Select or create category"}
							<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0">
						<Command>
							<CommandInput
								placeholder="Search or create category..."
								value={catInput}
								onValueChange={setCatInput}
							/>
							<CommandEmpty>
								<div
									className="flex items-center gap-2 cursor-pointer p-2 hover:bg-muted"
									onClick={() =>
										handleCategoryCreate(catInput)
									}
								>
									<PlusCircle className="h-4 w-4" />
									Create new category:{" "}
									<strong>{catInput}</strong>
								</div>
							</CommandEmpty>
							<CommandGroup>
								{allCategories.map((cat) => (
									<CommandItem
										key={cat.category}
										value={cat.category}
										onSelect={() => {
											setSelectedCategory(cat);
											setSelectedSkill(null); // reset skill when category changes
											setOpenCat(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												selectedCategory?.id === cat.id
													? "opacity-100"
													: "opacity-0"
											)}
										/>
										{cat.category}
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			{/* Skill Selector */}
			{selectedCategory && (
				<div>
					<label className="block mb-2 font-medium">
						Select Skill
					</label>
					<Popover open={openSkill} onOpenChange={setOpenSkill}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								className="w-full justify-between"
							>
								{selectedSkill?.name ??
									"Select or create skill"}
								<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput
									placeholder="Search or create skill..."
									value={skillInput}
									onValueChange={setSkillInput}
								/>
								<CommandEmpty>
									<div
										className="flex items-center gap-2 cursor-pointer p-2 hover:bg-muted"
										onClick={() =>
											handleSkillCreate(skillInput)
										}
									>
										<PlusCircle className="h-4 w-4" />
										Create new skill:{" "}
										<strong>{skillInput}</strong>
									</div>
								</CommandEmpty>
								<CommandGroup>
									{filteredSkills.map((skill) => (
										<CommandItem
											key={skill.id}
											value={skill.name}
											onSelect={() => {
												setSelectedSkill(skill);
												setOpenSkill(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													selectedSkill?.id ===
														skill.id
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											{skill.name}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			)}

			{/* Continue Button */}
			{selectedSkill && (
				<Button
					variant="modern"
					className="mt-4 w-full"
					onClick={() => onEnterHandler()}
				>
					ENTER TO CREATE LISTING
				</Button>
			)}
		</div>
	);
}

export default SkillSelector;
