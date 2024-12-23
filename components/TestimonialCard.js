import React from "react";

export function TestimonialCard({ img, feedback, client, title }) {
	return (
		<div className="flex justify-center text-center">
			<div className="bg-white p-6 rounded-lg ">
				<div className="flex justify-center mb-3">
					<img src={img} alt={client} className="rounded-full w-20 h-20" />
				</div>
				<h6 className="text-blue-500 text-xl">{client}</h6>
				<p className="text-sm mb-3 font-medium text-gray-700">{title}</p>
				<p className="text-gray-500 mb-5">{`"${feedback}"`}</p>
			</div>
		</div>
	);
}

export default TestimonialCard;
