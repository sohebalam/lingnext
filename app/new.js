"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/firebase/config";
import { collection, getDoc, updateDoc, doc } from "firebase/firestore";

export default function EditPage() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		text: "",
		textLanguage: "",
		translations: [{ language: "", text: "" }],
		picture: null,
		pictureUrl: "",
		isFrontCover: false,
	});
	const [pages, setPages] = useState([]); // To manage the order of pages

	const nodeRef = useRef(null); // For the Draggable component

	useEffect(() => {
		const fetchPageData = async () => {
			try {
				if (id) {
					const pageDoc = await getDoc(doc(db, "pages", id));
					if (pageDoc.exists()) {
						const data = pageDoc.data();
						setFormData((prev) => ({
							...prev,
							...data,
							pictureUrl: data.picture || "",
						}));
					} else {
						alert("Page not found.");
					}
					// Example pages array for drag-and-drop functionality
					setPages([
						{ id: "1", name: "Page 1" },
						{ id: "2", name: "Page 2" },
						{ id: "3", name: "Page 3" },
					]);
				}
			} catch (error) {
				console.error("Error fetching page:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchPageData();
	}, [id]);

	if (loading) return <p>Loading...</p>;

	return (
		<div className="flex space-x-10 max-w-6xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
			{/* Form Column */}
			<div className="w-2/3 space-y-4">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Page</h2>
				<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
					{/* Picture Input */}
					<div className="flex items-center gap-2">
						<div>
							<label className="block font-medium text-gray-700">
								Update Picture
							</label>
							<input
								type="file"
								accept="image/*"
								onChange={(e) => {
									const file = e.target.files[0];
									if (file) {
										// Handle file upload logic here
									}
								}}
								className="block mt-1"
							/>
						</div>
						{/* Display Current Picture */}
						{formData.pictureUrl && (
							<img
								src={formData.pictureUrl}
								alt="Current Page"
								className="w-16 h-16 rounded-full object-cover border"
							/>
						)}
					</div>

					{/* Text Input */}
					<div>
						<label className="block font-medium text-gray-700">Text</label>
						<textarea
							name="text"
							value={formData.text}
							onChange={(e) =>
								setFormData({ ...formData, text: e.target.value })
							}
							rows="4"
							className="w-full mt-1 p-2 border border-gray-300 rounded-md"
						></textarea>
					</div>
					{/* Language */}
					<div>
						<label className="block font-medium text-gray-700">
							Language of Text
						</label>
						<input
							type="text"
							name="textLanguage"
							value={formData.textLanguage}
							onChange={(e) =>
								setFormData({ ...formData, textLanguage: e.target.value })
							}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
