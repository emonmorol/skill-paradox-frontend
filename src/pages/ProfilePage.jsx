"use client";

import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const initialUser = {
	id: 1,
	name: "Abu Bakar",
	username: "abubakar1984",
	email: "abubakar@example.com",
	profile_picture: "", // or URL string
	location: "Cumilla, Bangladesh",
	availability: "Weekdays 9am - 6pm",
	contact_info: "+880123456789",
	is_active: true,
	skills: [
		{ id: 1, name: "JavaScript", type: "offer" },
		{ id: 2, name: "React", type: "offer" },
		{ id: 3, name: "Tailwind", type: "need" },
	],
	certifications: [
		{
			id: 1,
			skill: "JavaScript",
			level: "Professional",
			status: "approved",
		},
		{ id: 2, skill: "React", level: "Beginner", status: "pending" },
	],
	badges: [
		{
			id: 1,
			name: "Early Adopter",
			description: "Joined in the early phase",
		},
		{ id: 2, name: "Skill Sharer", description: "Shared 3+ skills" },
	],
};

export default function FullProfilePage() {
	const [user, setUser] = useState(initialUser);
	const [editingSection, setEditingSection] = useState(null);
	const [tempData, setTempData] = useState({});
	const fileInputRef = useRef(null);

	function startEditing(section) {
		setEditingSection(section);
		if (section === "info") {
			setTempData({
				name: user.name,
				username: user.username,
				email: user.email,
				location: user.location,
				contact_info: user.contact_info,
				is_active: user.is_active,
				profile_picture: user.profile_picture,
				profile_picture_file: null,
			});
		} else {
			setTempData(user[section].map((item) => ({ ...item })));
		}
	}

	function cancelEditing() {
		setEditingSection(null);
		setTempData({});
	}

	function saveEditing() {
		if (editingSection === "info") {
			setUser((prev) => ({
				...prev,
				...tempData,
				profile_picture:
					tempData.profile_picture || prev.profile_picture,
			}));
		} else {
			setUser((prev) => ({
				...prev,
				[editingSection]: tempData,
			}));
		}
		setEditingSection(null);
		setTempData({});
	}

	function handleChange(e, idx = null, field = null) {
		const { name, value, type, checked, files } = e.target;
		if (editingSection === "info") {
			if (name === "profile_picture" && files && files[0]) {
				const file = files[0];
				const reader = new FileReader();
				reader.onload = () => {
					setTempData((prev) => ({
						...prev,
						profile_picture: reader.result,
						profile_picture_file: file,
					}));
				};
				reader.readAsDataURL(file);
			} else if (type === "checkbox") {
				setTempData((prev) => ({
					...prev,
					[name]: checked,
				}));
			} else {
				setTempData((prev) => ({
					...prev,
					[name]: value,
				}));
			}
		} else if (idx !== null && field !== null) {
			setTempData((prev) => {
				const copy = [...prev];
				copy[idx] = { ...copy[idx], [field]: value };
				return copy;
			});
		}
	}

	function addItem() {
		if (editingSection === "skills") {
			setTempData((prev) => [
				...prev,
				{ id: Date.now(), name: "", type: "offer" },
			]);
		} else if (editingSection === "certifications") {
			setTempData((prev) => [
				...prev,
				{
					id: Date.now(),
					skill: "",
					level: "Beginner",
					status: "pending",
				},
			]);
		} else if (editingSection === "badges") {
			setTempData((prev) => [
				...prev,
				{ id: Date.now(), name: "", description: "" },
			]);
		}
	}

	function removeItem(idx) {
		setTempData((prev) => prev.filter((_, i) => i !== idx));
	}

	return (
		<div className="min-h-screen bg-gray-50 px-8 py-12 max-w-[1400px] mx-auto">
			<div className="flex flex-col md:flex-row md:gap-10">
				{/* Left panel - User Info */}
				<Card className="flex-shrink-0 w-full md:w-[320px] p-8 shadow-lg">
					<div className="flex flex-col items-center">
						<div className="relative mb-6">
							<Avatar className="w-36 h-36 ring-4 ring-indigo-400 shadow-lg cursor-pointer">
								{editingSection === "info" &&
								tempData.profile_picture ? (
									<AvatarImage
										src={tempData.profile_picture}
									/>
								) : user.profile_picture ? (
									<AvatarImage src={user.profile_picture} />
								) : (
									<AvatarFallback className="text-7xl font-extrabold text-indigo-600">
										{user.name[0]}
									</AvatarFallback>
								)}
							</Avatar>

							{editingSection === "info" && (
								<>
									<input
										type="file"
										accept="image/*"
										ref={fileInputRef}
										className="hidden"
										onChange={handleChange}
										name="profile_picture"
									/>
									<Button
										size="sm"
										variant="outline"
										className="absolute bottom-0 right-0"
										onClick={() =>
											fileInputRef.current?.click()
										}
									>
										Change Photo
									</Button>
								</>
							)}
						</div>

						<div className="text-center w-full">
							<div className="flex justify-between items-center mb-2">
								{editingSection === "info" ? (
									<Input
										name="name"
										value={tempData.name || ""}
										onChange={handleChange}
										autoFocus
										className="text-3xl font-bold text-center"
									/>
								) : (
									<h1 className="text-3xl font-bold text-indigo-700">
										{user.name}
									</h1>
								)}

								{editingSection !== "info" && (
									<Button
										size="sm"
										onClick={() => startEditing("info")}
									>
										Edit
									</Button>
								)}
							</div>

							<p className="text-gray-600 text-lg mb-1">
								@
								{editingSection === "info" ? (
									<Input
										name="username"
										value={tempData.username || ""}
										onChange={handleChange}
										className="text-center"
									/>
								) : (
									user.username
								)}
							</p>

							<p className="text-gray-600 mb-1 text-center">
								{editingSection === "info" ? (
									<Input
										type="email"
										name="email"
										value={tempData.email || ""}
										onChange={handleChange}
										className="text-center"
									/>
								) : (
									user.email
								)}
							</p>

							<p className="text-gray-600 mb-1 text-center">
								📍{" "}
								{editingSection === "info" ? (
									<Input
										name="location"
										value={tempData.location || ""}
										onChange={handleChange}
										className="text-center"
									/>
								) : (
									user.location
								)}
							</p>

							<p className="text-gray-600 mb-3 text-center">
								📞{" "}
								{editingSection === "info" ? (
									<Input
										name="contact_info"
										value={tempData.contact_info || ""}
										onChange={handleChange}
										className="text-center"
									/>
								) : (
									user.contact_info
								)}
							</p>

							<p
								className={`font-semibold text-center ${
									user.is_active
										? "text-green-600"
										: "text-red-600"
								} mb-3`}
							>
								{editingSection === "info" ? (
									<div className="flex justify-center items-center gap-2">
										<input
											id="is_active"
											name="is_active"
											type="checkbox"
											checked={
												tempData.is_active || false
											}
											onChange={handleChange}
											className="w-5 h-5 text-indigo-600 rounded"
										/>
										<Label
											htmlFor="is_active"
											className="cursor-pointer select-none"
										>
											Active
										</Label>
									</div>
								) : user.is_active ? (
									"✔ Active"
								) : (
									"❌ Inactive"
								)}
							</p>

							{editingSection === "info" && (
								<div className="flex justify-center gap-4 mt-4">
									<Button onClick={saveEditing}>Save</Button>
									<Button
										variant="outline"
										onClick={cancelEditing}
									>
										Cancel
									</Button>
								</div>
							)}
						</div>
					</div>
				</Card>

				{/* Right panel - Skills, Certifications, Badges */}
				<div className="flex-1 flex flex-col gap-8">
					{/* Skills */}
					<Card className="p-6 shadow-lg flex flex-col">
						<div className="flex justify-between items-center mb-4">
							<CardTitle className="text-2xl font-bold">
								Skills
							</CardTitle>
							{editingSection === "skills" ? null : (
								<Button
									size="sm"
									onClick={() => startEditing("skills")}
								>
									Edit
								</Button>
							)}
						</div>

						{editingSection === "skills" ? (
							<>
								{tempData.map((skill, i) => (
									<div
										key={skill.id}
										className="flex items-center gap-3 mb-3"
									>
										<Input
											placeholder="Skill name"
											value={skill.name}
											onChange={(e) =>
												handleChange(e, i, "name")
											}
											className="flex-1"
											autoFocus={
												i === tempData.length - 1
											}
										/>
										<select
											value={skill.type}
											onChange={(e) =>
												handleChange(e, i, "type")
											}
											className="border rounded px-2 py-1 text-sm"
										>
											<option value="offer">Offer</option>
											<option value="need">Need</option>
										</select>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => removeItem(i)}
											title="Remove skill"
										>
											Remove
										</Button>
									</div>
								))}
								<Button
									onClick={addItem}
									className="mt-2 self-start"
								>
									+ Add Skill
								</Button>

								<div className="mt-4 flex gap-4">
									<Button onClick={saveEditing}>Save</Button>
									<Button
										variant="outline"
										onClick={cancelEditing}
									>
										Cancel
									</Button>
								</div>
							</>
						) : (
							<div className="flex flex-wrap gap-3">
								{user.skills.map((skill) => (
									<Badge
										key={skill.id}
										variant={
											skill.type === "offer"
												? "default"
												: "secondary"
										}
										className={`px-4 py-2 cursor-default select-none ${
											skill.type === "offer"
												? "bg-indigo-500 hover:bg-indigo-600 text-white"
												: "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
										}`}
									>
										{skill.name} ({skill.type})
									</Badge>
								))}
							</div>
						)}
					</Card>

					{/* Certifications */}
					<Card className="p-6 shadow-lg flex flex-col">
						<div className="flex justify-between items-center mb-4">
							<CardTitle className="text-2xl font-bold">
								Certifications
							</CardTitle>
							{editingSection === "certifications" ? null : (
								<Button
									size="sm"
									onClick={() =>
										startEditing("certifications")
									}
								>
									Edit
								</Button>
							)}
						</div>

						{editingSection === "certifications" ? (
							<>
								{tempData.map((cert, i) => (
									<div
										key={cert.id}
										className="flex items-center gap-3 mb-3"
									>
										<Input
											placeholder="Skill"
											value={cert.skill}
											onChange={(e) =>
												handleChange(e, i, "skill")
											}
											className="flex-1"
											autoFocus={
												i === tempData.length - 1
											}
										/>
										<select
											value={cert.level}
											onChange={(e) =>
												handleChange(e, i, "level")
											}
											className="border rounded px-2 py-1 text-sm"
										>
											<option>Beginner</option>
											<option>Intermediate</option>
											<option>Professional</option>
										</select>
										<select
											value={cert.status}
											onChange={(e) =>
												handleChange(e, i, "status")
											}
											className="border rounded px-2 py-1 text-sm"
										>
											<option value="pending">
												Pending
											</option>
											<option value="approved">
												Approved
											</option>
											<option value="rejected">
												Rejected
											</option>
										</select>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => removeItem(i)}
											title="Remove certification"
										>
											Remove
										</Button>
									</div>
								))}
								<Button
									onClick={addItem}
									className="mt-2 self-start"
								>
									+ Add Certification
								</Button>

								<div className="mt-4 flex gap-4">
									<Button onClick={saveEditing}>Save</Button>
									<Button
										variant="outline"
										onClick={cancelEditing}
									>
										Cancel
									</Button>
								</div>
							</>
						) : (
							<div className="space-y-2">
								{user.certifications.map((cert) => (
									<div
										key={cert.id}
										className="flex justify-between border-b pb-2 text-sm"
									>
										<span>
											{cert.skill} ({cert.level})
										</span>
										<span
											className={`font-semibold ${
												cert.status === "approved"
													? "text-green-600"
													: cert.status === "pending"
													? "text-orange-500"
													: "text-red-600"
											}`}
										>
											{cert.status
												.charAt(0)
												.toUpperCase() +
												cert.status.slice(1)}
										</span>
									</div>
								))}
							</div>
						)}
					</Card>

					{/* Badges */}
					<Card className="p-6 shadow-lg flex flex-col">
						<div className="flex justify-between items-center mb-4">
							<CardTitle className="text-2xl font-bold">
								Badges
							</CardTitle>
							{editingSection === "badges" ? null : (
								<Button
									size="sm"
									onClick={() => startEditing("badges")}
								>
									Edit
								</Button>
							)}
						</div>

						{editingSection === "badges" ? (
							<>
								{tempData.map((badge, i) => (
									<div
										key={badge.id}
										className="flex items-center gap-3 mb-3"
									>
										<Input
											placeholder="Badge name"
											value={badge.name}
											onChange={(e) =>
												handleChange(e, i, "name")
											}
											className="flex-1"
											autoFocus={
												i === tempData.length - 1
											}
										/>
										<Input
											placeholder="Description"
											value={badge.description}
											onChange={(e) =>
												handleChange(
													e,
													i,
													"description"
												)
											}
											className="flex-1"
										/>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => removeItem(i)}
											title="Remove badge"
										>
											Remove
										</Button>
									</div>
								))}
								<Button
									onClick={addItem}
									className="mt-2 self-start"
								>
									+ Add Badge
								</Button>

								<div className="mt-4 flex gap-4">
									<Button onClick={saveEditing}>Save</Button>
									<Button
										variant="outline"
										onClick={cancelEditing}
									>
										Cancel
									</Button>
								</div>
							</>
						) : (
							<div className="space-y-3">
								{user.badges.map((badge) => (
									<div
										key={badge.id}
										className="bg-indigo-100 p-3 rounded-md text-indigo-700 shadow-sm"
										title={badge.description}
									>
										<strong>{badge.name}</strong>:{" "}
										{badge.description}
									</div>
								))}
							</div>
						)}
					</Card>
				</div>
			</div>
		</div>
	);
}
