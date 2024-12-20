"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Language from "@/app/models/Languages";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ManagePages() {
	const [languages, setLanguages] = useState([
		new Language("English", "en"),
		new Language("Arabic", "ar"),
	]); // Default languages
	const [texts, setTexts] = useState([
		{ language: "en", text: "" },
		{ language: "ar", text: "" },
	]);
	const [image, setImage] = useState(null);
	const [title, setTitle] = useState(""); // Book title
	const [loading, setLoading] = useState(false);
	const [isCover, setIsCover] = useState(false); // To specify if the page is the cover
	const [isTranslationsCollapsed, setIsTranslationsCollapsed] = useState(true); // State for collapsing translations section

	// Fetch languages only on mount
	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				// Fetch languages from Firestore
				const languagesSnapshot = await getDocs(collection(db, "languages"));
				const fetchedLanguages = languagesSnapshot.docs.map((doc) => {
					const data = doc.data();
					// Create a Language instance for each fetched language
					return new Language(data.languageName, data.languageCode);
				});

				console.log("Fetched languages:", fetchedLanguages); // Verify fetched data

				// Merge default and fetched languages
				setLanguages((prev) => [...prev, ...fetchedLanguages]);
			} catch (error) {
				console.error("Error fetching languages:", error.message);
			}
		};

		fetchLanguages();
	}, []);

	// Handle form submission to create a new page and book
	const handleBookSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Validation: Ensure an image, title, and texts are provided
		if (!title || !image || texts.some((t) => !t.language || !t.text)) {
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

			// Define the page structure to match the Book model
			const newPage = {
				id: Date.now().toString(), // Use a unique ID for the page
				imageUrl,
				isCover, // Set whether this page is the cover
				translations: texts,
			};

			const newBook = {
				title,
				pages: [newPage], // Add the new page to the book's pages
			};

			// Add the book to the 'books' collection
			await addDoc(collection(db, "books"), newBook);
			alert("Book and page added successfully!");
		} catch (error) {
			console.error("Error adding book:", error.message);
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

	// Remove a text field
	const removeText = (index) => {
		const updatedTexts = texts.filter((_, i) => i !== index);
		setTexts(updatedTexts);
	};

	// Toggle translations section collapse/expand
	const toggleTranslationsCollapse = () => {
		setIsTranslationsCollapsed(!isTranslationsCollapsed);
	};

	console.log("Current languages state:", languages); // Log state after it is updated

	return (
		<div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md space-y-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Pages</h2>

			{/* Book Form */}
			<form onSubmit={handleBookSubmit} className="space-y-4">
				{/* Title Input */}
				<div>
					<label className="block font-medium text-gray-700">Book Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
					/>
				</div>

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

				{/* Cover Page Toggle */}
				<div>
					<label className="block font-medium text-gray-700">
						Is this page the cover?
					</label>
					<input
						type="checkbox"
						checked={isCover}
						onChange={() => setIsCover((prev) => !prev)}
						className="mt-1"
					/>
				</div>

				{/* Always Show First Two Translations */}
				<div>
					<h3 className="text-lg font-medium text-gray-800">Translations</h3>
					{texts.slice(0, 2).map((text, index) => (
						<div key={`text-${index}`} className="space-y-2">
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
								{/* Display both default and fetched languages */}
								{languages.map((language, langIndex) => (
									<option
										key={`language-${language.id || langIndex}`}
										value={language.id}
									>
										{language.languageName || language.name}{" "}
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
							{/* <button
								type="button"
								onClick={() => removeText(index)}
								className="text-red-600 hover:underline"
							>
								Remove Translation
							</button> */}
						</div>
					))}
				</div>

				{/* Collapsible Additional Translations */}
				<div>
					<button
						type="button"
						onClick={toggleTranslationsCollapse}
						className="text-blue-600 hover:underline mt-2"
					>
						{isTranslationsCollapsed ? "Show More Translations" : "Hide More"}
					</button>

					{/* {!isTranslationsCollapsed && ( */}
					<div className="mt-4 space-y-4">
						{texts.slice(2).map((text, index) => (
							<div key={`text-${index + 2}`} className="space-y-2">
								<select
									value={text.language}
									onChange={(e) =>
										handleTextChange(index + 2, "language", e.target.value)
									}
									required
									className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
								>
									<option value="" disabled>
										Select Language
									</option>
									{/* Display both default and fetched languages */}
									{languages.map((language, langIndex) => (
										<option
											key={`language-${language.id || langIndex}`}
											value={language.id}
										>
											{language.languageName || language.name}{" "}
										</option>
									))}
								</select>
								<textarea
									placeholder="Text"
									rows="2"
									value={text.text}
									onChange={(e) =>
										handleTextChange(index + 2, "text", e.target.value)
									}
									required
									className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
								/>
								<button
									type="button"
									onClick={() => removeText(index + 2)}
									className="text-red-600 hover:underline"
								>
									Remove Translation
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={addText}
							className="text-blue-600 hover:underline mt-2"
						>
							Add More Translation
						</button>
					</div>
					{/* )} */}
				</div>

				{/* Submit Button */}
				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						{loading ? "Adding..." : "Add Book and Page"}
					</button>
				</div>
			</form>
		</div>
	);
}
