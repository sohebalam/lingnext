import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const testimonials = [
	{
		id: 1,
		image: "assets/bookcovers/alphabet.png",
		quote: "Download Free Now",
		name: "Level",
		position: "A1",
		link: "https://tpotfztqgghafmdwdmfc.supabase.co/storage/v1/object/public/Lingo%20Tales/Alphabet.pdf?t=2024-12-28T12%3A48%3A36.611Z",
	},
	{
		id: 2,
		image: "assets/bookcovers/animals.png",
		quote: "Download Free Now",
		name: "Level",
		position: "A1",
		link: "https://tpotfztqgghafmdwdmfc.supabase.co/storage/v1/object/public/Lingo%20Tales/Blue%20and%20Green%20Illustrative%20Animal%20Story%20Book%20Cover%20(3).pdf?t=2024-12-23T17%3A15%3A51.638Z",
	},
	{
		id: 3,
		image: "assets/bookcovers/at the park.png",
		quote: "Download Free Now",
		name: "Level",
		position: "A1",
		link: "https://tpotfztqgghafmdwdmfc.supabase.co/storage/v1/object/public/Lingo%20Tales/At%20The%20Park.pdf?t=2024-12-28T12%3A47%3A29.390Z",
	},
	{
		id: 4,
		image: "assets/bookcovers/at school.png",
		quote: "Download Free Now",
		name: "Level",
		position: "A1",
		link: "https://tpotfztqgghafmdwdmfc.supabase.co/storage/v1/object/public/Lingo%20Tales/At%20School.pdf?t=2024-12-28T12%3A48%3A09.965Z",
	},
	{
		id: 5,
		image: "assets/bookcovers/at the beach.png",
		quote: "Download Free Now",
		name: "Level",
		position: "A1",
		link: "https://tpotfztqgghafmdwdmfc.supabase.co/storage/v1/object/public/Lingo%20Tales/At%20The%20Beach%20(1).pdf?t=2024-12-28T12%3A46%3A11.309Z",
	},
	{
		id: 6,
		image: "assets/bookcovers/life in the big city.png",
		quote: "Download Free Now",
		name: "Level",
		position: "A1",
		link: "https://tpotfztqgghafmdwdmfc.supabase.co/storage/v1/object/public/Lingo%20Tales/Blue%20and%20Green%20Illustrative%20Animal%20Story%20Book%20Cover%20(1).pdf",
	},
	{
		id: 7,
		image: "assets/bookcovers/alphabet2.png",
		quote: "Download Free Now",
		name: "Level",
		position: "A1",
		link: "https://tpotfztqgghafmdwdmfc.supabase.co/storage/v1/object/public/Lingo%20Tales/alphabet2.pdf?t=2024-12-28T12%3A46%3A53.095Z",
	},
];

const LatestBooks = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 4) % testimonials.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 4 + testimonials.length) % testimonials.length
		);
	};

	return (
		<div className="flex flex-col items-center justify-center space-y-4 bg-gradient-to-r from-[#b2b9c7] to-[#545f75] md:min-h-[35vh] lg:min-h-[40rem]">
			<div className="grid grid-cols-4 gap-3 w-full h-[500px] p-4">
				{testimonials
					.slice(currentIndex, currentIndex + 4)
					.map((testimonial) => (
						<a
							key={testimonial.id}
							href={testimonial.link}
							target="_blank"
							rel="noopener noreferrer"
							download
							className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
						>
							{/* Image Section */}
							<div className="w-full h-5/6">
								<img
									src={testimonial.image}
									className="w-full h-full object-cover"
									alt="Testimonial"
								/>
							</div>
							{/* Text Section */}
							<div className="w-full bg-white p-4 flex flex-col justify-center items-center">
								<p className="text-center text-gray-800 font-semibold">
									{testimonial.quote}
								</p>
								<p className="text-center text-sm text-gray-600 mt-1">
									{testimonial.name}, {testimonial.position}
								</p>
							</div>
						</a>
					))}
			</div>

			<div className="flex items-center justify-center space-x-4">
				<button
					onClick={prevSlide}
					className="flex items-center justify-center px-6 py-3 rounded-full bg-white shadow-lg text-gray-700 font-bold hover:bg-gray-200 transition"
				>
					<ArrowLeftIcon size={24} className="size-6 text-black mr-2" />
					Prev
				</button>
				<button
					onClick={nextSlide}
					className="flex items-center justify-center px-6 py-3 rounded-full bg-white shadow-lg text-gray-700 font-bold hover:bg-gray-200 transition"
				>
					Next
					<ArrowRightIcon size={24} className="size-6 text-black ml-2" />
				</button>
			</div>
		</div>
	);
};

export default LatestBooks;
