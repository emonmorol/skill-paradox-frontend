"use client";

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const courses = [
	"Full-Stack Web Development with React & Node.js",
	"Advanced TypeScript Masterclass",
	"MongoDB for Modern Applications",
	"Complete Tailwind CSS & UI Design",
	"Next.js: Full Stack Development Guide",
	"Docker & Kubernetes for Developers",
	"GraphQL API Development with Apollo",
	"Prisma ORM: Modern Database Access",
	"Building Scalable Microservices",
	"RESTful API Design Best Practices",
	"Machine Learning for Web Developers",
	"DevOps & CI/CD Pipelines",
	"Serverless Architecture Masterclass",
	"Authentication & Authorization in Modern Apps",
];

export default function SlotDialog({ open, onClose, slotNumber }) {
	const handleCourseClick = (course) => {
		toast.success(`You clicked: ${course}`);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Slot {slotNumber}</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Select a Listings from below:
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3 py-4">
					{courses.map((course, index) => (
						<button
							key={index}
							onClick={() => handleCourseClick(course)}
							className="text-left p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition shadow-sm cursor-pointer border border-gray-200"
						>
							{course}
						</button>
					))}
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
