"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ManagePages() {
	const [languages, setLanguages] = useState([
		{ id: "en", name: "English" },
		{ id: "ar", name: "Arabic" },
	]); // Default languages
	const [texts, setTexts] = useState([
		{ language: "en", text: "" },
		{ language: "ar", text: "" }, // Default second text field for Arabic
	]);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	// Fetch languages only on mount
	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				// Fetch languages
				const languagesSnapshot = await getDocs(collection(db, "languages"));
				const fetchedLanguages = languagesSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				if (fetchedLanguages.length > 0) {
					setLanguages((prev) => [...prev, ...fetchedLanguages]);
				}
				console.log("Fetched languages:", fetchedLanguages);
			} catch (error) {
				console.error("Error fetching languages:", error.message);
			}
		};

		fetchLanguages();
	}, []);

	// Handle form submission to create a new page
	const handlePageSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Validation: Ensure an image and texts are provided
		if (!image || texts.some((t) => !t.language || !t.text)) {
			setLoading(false);
			return;
		}

		if (languages.length < 2) {
			setLoading(false);
			return;
		}

		try {
			let imageUrl = null;
			const storage = getStorage();

			// Upload image to storage
			if (image) {
				const storageRef = ref(storage, `pages/${image.name}`);
				await uploadBytes(storageRef, image);
				imageUrl = await getDownloadURL(storageRef);
			}

			// Define the page model structure
			const Page = {
				image: imageUrl,
				texts,
			};

			// Add the page to the 'pages' collection
			await addDoc(collection(db, "pages"), Page);
			alert("Page added successfully!");
		} catch (error) {
			console.error("Error adding page:", error.message);
		}

		setLoading(false);
	};

	// Handle image selection
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
		}
	};

	// Handle text input change
	const handleTextChange = (index, field, value) => {
		const updatedTexts = [...texts];
		updatedTexts[index][field] = value;
		setTexts(updatedTexts);
	};

	// Add a new text field
	const addText = () => {
		setTexts([...texts, { language: "en", text: "" }]);
	};

	return (
		<div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md space-y-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Pages</h2>

			{/* Page Form */}
			<form onSubmit={handlePageSubmit} className="space-y-4">
				{/* Image Input */}
				<div>
					<label className="block font-medium text-gray-700">
						Upload Image
					</label>
					<input
						type="file"
						onChange={handleFileChange}
						accept="image/*"
						required
						className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
					/>
				</div>

				{/* Texts */}
				<div>
					<h3 className="text-lg font-medium text-gray-800">Texts</h3>
					{texts.map((text, index) => (
						<div key={index} className="space-y-2">
							<select
								value={text.language}
								onChange={(e) =>
									handleTextChange(index, "language", e.target.value)
								}
								required
								className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
							>
								<option value="" disabled>
									Select Language
								</option>
								{languages.map((language) => (
									<option key={language.id} value={language.id}>
										{language.name}
									</option>
								))}
							</select>
							<textarea
								placeholder="Text"
								rows="2"
								value={text.text}
								onChange={(e) =>
									handleTextChange(index, "text", e.target.value)
								}
								required
								className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
							/>
						</div>
					))}
					<button
						type="button"
						onClick={addText}
						className="text-blue-600 hover:underline mt-2"
					>
						Add Text
					</button>
				</div>

				{/* Submit Button */}
				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						{loading ? "Adding..." : "Add Page"}
					</button>
				</div>
			</form>
		</div>
	);
}
