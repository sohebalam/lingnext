import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const testimonials = [
	{
		id: 1,
		image:
			"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
		quote: "This product changed my life! Highly recommend trying it out.",
		name: "Jane Doe",
		position: "Creative Director",
	},
	{
		id: 2,
		image:
			"https://plus.unsplash.com/premium_photo-1664540415069-bc45ce3e711e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
		quote:
			"A superb experience from start to finish. Will definitely be back for more.",
		name: "John Smith",
		position: "Marketing Specialist",
	},
	{
		id: 3,
		image:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww",
		quote:
			"Never have I ever felt so satisfied with a purchase. Exceptional quality!",
		name: "Emily R.",
		position: "Product Manager",
	},
	{
		id: 4,
		image:
			"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
		quote: "Their customer service was outstanding and product is top-notch!",
		name: "Michael B.",
		position: "Project Coordinator",
	},
	{
		id: 5,
		image:
			"https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww",
		quote: "Five stars! Will definitely recommend to my colleagues.",
		name: "Sarah W.",
		position: "CEO",
	},
	{
		id: 6,
		image:
			"https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600",
		quote: "Incredible results after just one month. Worth every penny!",
		name: "Dave L.",
		position: "Freelancer",
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
					.map((testimonial, index) => (
						<div
							key={testimonial.id}
							className="relative flex flex-col items-center justify-end bg-white rounded-lg shadow-lg overflow-hidden"
						>
							<div className="absolute inset-0">
								<img
									src={testimonial.image}
									className="w-full h-full object-cover"
									alt="Testimonial"
								/>
							</div>
							<div className="relative bg-white bg-opacity-90 p-4 flex flex-col justify-center items-center">
								<p className="text-center text-gray-800 font-semibold">
									{testimonial.quote}
								</p>
								{/* <p className="text-center text-sm text-gray-600 mt-1">
									{testimonial.name}, {testimonial.position}
								</p> */}
							</div>
						</div>
					))}
			</div>
			<div className="flex items-center justify-center space-x-4">
				<button
					onClick={prevSlide}
					className="flex items-center justify-center px-6 py-3 rounded-full bg-white shadow-lg text-blue-500 font-bold hover:bg-gray-200 transition"
				>
					<FiArrowLeft size={24} className="mr-2" />
					Prev
				</button>
				<button
					onClick={nextSlide}
					className="flex items-center justify-center px-6 py-3 rounded-full bg-white shadow-lg text-green-500 font-bold hover:bg-gray-200 transition"
				>
					Next
					<FiArrowRight size={24} className="ml-2" />
				</button>
			</div>
		</div>
	);
};

export default LatestBooks;
