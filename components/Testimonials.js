"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import TestimonialCard from "@/components/TestimonialCard";

const TESTIMONIALS = [
	{
		feedback:
			"Lingo Stories has been a transformative experience for my language learning. The engaging storybooks make picking up a new language feel natural and fun!",
		client: "Jessica Devis",
		title: "Language Enthusiast",
		img: "/assets/avatar1.jpg",
	},
	{
		feedback:
			"As someone who struggled with traditional methods, Lingo Stories gave me a fresh and exciting way to learn. It's like revisiting my childhood but in a whole new language!",
		client: "Mary Joshiash",
		title: "Multilingual Explorer",
		img: "/assets/avatar2.jpg",
	},
	{
		feedback:
			"My kids love the interactive picture books, and I'm amazed at how much they've learned in such a short time. A must-have for families exploring new languages!",
		client: "Marcell Glock",
		title: "Parent & Educator",
		img: "/assets/avatar3.jpg",
	},
];

export function Testimonials() {
	return (
		<section className="px-10 py-10">
			<div className="container mx-auto">
				<div className="mb-5 flex w-full flex-col items-center">
					<Typography variant="h2" color="blue-gray" className="mb-2">
						What Our Users Say
					</Typography>
					<Typography
						variant="lead"
						className="mb-10 max-w-3xl text-center !text-gray-600"
					>
						"Discover how Lingo Stories is transforming language learning for
						our users. From engaging storybooks to an immersive experience, hear
						how we make learning languages fun and effective for all ages!"
					</Typography>
				</div>
				<div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 lg:px-20">
					{TESTIMONIALS.map((props, key) => (
						<TestimonialCard key={key} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
export default Testimonials;
