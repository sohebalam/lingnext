"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/service/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function EditPage() {
	const { bookId, pageId } = useParams(); // Get both bookId and pageId from URL params
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		id: "",
		image: "", // Initialize with an empty string for image URL
		isCover: false,
		translations: [{ language: "", text: "" }],
	});

	// Fetch book details when bookId and pageId are available
	useEffect(() => {
		if (bookId && pageId) {
			console.log(
				"Fetching book details for bookId:",
				bookId,
				"pageId:",
				pageId
			); // Debugging
			fetchBookDetails();
		}
	}, [bookId, pageId]);

	// Fetch book details from Firestore and extract the page
	const fetchBookDetails = async () => {
		try {
			setLoading(true);
			const bookRef = doc(db, "books", bookId);
			const bookSnap = await getDoc(bookRef);

			if (bookSnap.exists()) {
				const bookData = bookSnap.data();
				const page = bookData.pages.find((p) => p.id === pageId);

				if (page) {
					console.log("Fetched page data:", page); // Debugging
					setFormData(page); // Set page data to formData, including image
				} else {
					console.log("No page found for the given pageId");
				}
			} else {
				console.log("No book found for the given bookId");
			}
		} catch (error) {
			console.error("Error fetching book details:", error);
		} finally {
			setLoading(false);
		}
	};

	// Handle input changes in form fields
	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// Handle changes to translations array
	const handleTranslationChange = (index, field, value) => {
		const updatedTranslations = [...formData.translations];
		updatedTranslations[index][field] = value;
		setFormData({
			...formData,
			translations: updatedTranslations,
		});
	};

	// Show loading message if the data is still being fetched
	if (loading) return <p>Loading...</p>;

	return (
		<div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Page</h2>
			<form onSubmit={(e) => e.preventDefault()} className="space-y-6">
				{/* Picture Section */}
				<div className="flex items-center gap-4">
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
									const reader = new FileReader();
									reader.onload = () => {
										setFormData((prev) => ({
											...prev,
											imageUrl: reader.result, // Preview the new image
										}));
									};
									reader.readAsDataURL(file);
								}
							}}
							className="block mt-1"
						/>
					</div>
					{/* Avatar display */}
					{formData.image && (
						<div>
							<img
								src={formData.image} // This should display the image URL from Firestore
								alt="Avatar"
								className="w-16 h-16 rounded-full border-2 border-gray-300"
							/>
							{/* <p>Image URL: {formData.image}</p>{" "} */}
							{/* Debug: Display the image URL */}
						</div>
					)}
				</div>

				{/* Cover Page Checkbox */}
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						name="isCover"
						checked={formData.isCover}
						onChange={handleInputChange}
						className="h-5 w-5 text-blue-600"
					/>
					<label className="font-medium text-gray-700">
						Is this the cover page?
					</label>
				</div>

				{/* Translations Section */}
				<div>
					<label className="block font-medium text-gray-700">
						Translations
					</label>
					{formData.translations.map((translation, index) => (
						<div key={index} className="flex items-center gap-4 mt-2">
							<input
								type="text"
								placeholder="Language"
								value={translation.language}
								onChange={(e) =>
									handleTranslationChange(index, "language", e.target.value)
								}
								className="w-1/3 p-2 border border-gray-300 rounded-md"
							/>
							<input
								type="text"
								placeholder="Text"
								value={translation.text}
								onChange={(e) =>
									handleTranslationChange(index, "text", e.target.value)
								}
								className="w-2/3 p-2 border border-gray-300 rounded-md"
							/>
						</div>
					))}
				</div>

				<button
					onClick={() => {
						// Handle saving logic here
					}}
					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
				>
					Save Changes
				</button>
			</form>
		</div>
	);
}
