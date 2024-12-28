"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/service/AuthContext";
import { v4 as uuidv4 } from "uuid";

export default function ManagePages() {
	const router = useRouter();
	const { user } = useAuth();

	// const [pages, setPages] = useState([
	// 	{
	// 		id: uuidv4(),
	// 		image: null,
	// 		isCover: false,
	// 		translations: [
	// 			{ language: "en", text: "" },
	// 			{ language: "ar", text: "" },
	// 		],
	// 		isCollapsed: false,
	// 	},
	// ]);

	useEffect(() => {
		if (user && !user?.isAdmin) {
			router.push("/");
		}
	}, [user, router]);
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState(""); // Book title
	const [level, setLevel] = useState(""); // Book level

	// Add a new page with default values
	const addPage = () => {
		setPages((prev) => [
			...prev,
			{
				id: uuidv4(),
				image: null,
				isCover: false,
				translations: [
					{ language: "en", text: "" },
					{ language: "ar", text: "" },
				],
				isCollapsed: false,
			},
		]);
	};

	// Remove a page
	const removePage = (index) => {
		setPages((prev) => prev.filter((_, i) => i !== index));
	};

	// Update page properties
	const updatePage = (index, key, value) => {
		const updatedPages = [...pages];
		updatedPages[index][key] = value;
		setPages(updatedPages);
	};

	// Update translation for a specific page
	const updateTranslation = (pageIndex, translationIndex, key, value) => {
		const updatedPages = [...pages];
		updatedPages[pageIndex].translations[translationIndex][key] = value;
		setPages(updatedPages);
	};

	// Add a translation to a page
	const addTranslation = (pageIndex) => {
		const updatedPages = [...pages];
		updatedPages[pageIndex].translations.push({ language: "", text: "" });
		setPages(updatedPages);
	};

	// Remove a translation from a page
	const removeTranslation = (pageIndex, translationIndex) => {
		const updatedPages = [...pages];
		updatedPages[pageIndex].translations.splice(translationIndex, 1);
		setPages(updatedPages);
	};

	// Submit the book with pages
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Validation: Ensure the title, level, and required fields are filled
			if (
				!title ||
				!level ||
				pages.some(
					(page) =>
						!page.image ||
						(!page.isCover && page.translations.some((t) => !t.text))
				)
			) {
				alert("Please fill out all required fields.");
				setLoading(false);
				return;
			}

			const storage = getStorage();

			const updatedPages = await Promise.all(
				pages.map(async (page) => {
					let imageUrl = null;

					if (page.image) {
						const storageRef = ref(storage, `pages/${page.image.name}`);
						await uploadBytes(storageRef, page.image);
						imageUrl = await getDownloadURL(storageRef);
					}

					return { ...page, image: imageUrl };
				})
			);

			const newBook = {
				title,
				level,
				pages: updatedPages,
			};

			await addDoc(collection(db, "books"), newBook);
			alert("Book and pages added successfully!");
		} catch (error) {
			console.error("Error adding book:", error.message);
		}

		setLoading(false);
	};

	return (
		<div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md space-y-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Pages</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Book Title */}
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

				{/* Book Level */}
				<div>
					<label className="block font-medium text-gray-700">Book Level</label>
					<input
						type="text"
						value={level}
						onChange={(e) => setLevel(e.target.value)}
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
					/>
				</div>

				{/* Pages */}
				{pages.map((page, pageIndex) => (
					<div
						key={page.id}
						className="p-4 border border-gray-300 rounded-md bg-white space-y-4"
					>
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-medium text-gray-800">
								Page {pageIndex + 1}
							</h3>
							<div className="flex space-x-4">
								{pages.length > 1 && (
									<button
										type="button"
										onClick={() => removePage(pageIndex)}
										className="text-red-600 hover:underline"
									>
										Remove
									</button>
								)}
							</div>
						</div>

						{!page.isCollapsed && (
							<>
								{/* Image */}
								<div>
									<label className="block font-medium text-gray-700">
										Upload Page Image
									</label>
									<input
										type="file"
										onChange={(e) =>
											updatePage(pageIndex, "image", e.target.files[0])
										}
										accept="image/*"
										required
										className="mt-1 block w-full text-sm text-gray-600"
									/>
								</div>

								{/* Cover Page Toggle */}
								<div>
									<label className="block font-medium text-gray-700">
										Is this the cover page?
									</label>
									<input
										type="checkbox"
										checked={page.isCover}
										onChange={(e) =>
											updatePage(pageIndex, "isCover", e.target.checked)
										}
										className="mt-1"
									/>
								</div>

								{/* Translations */}
								{!page.isCover && (
									<div>
										<h4 className="font-medium text-gray-700">Translations</h4>

										{page.translations.map((translation, translationIndex) => (
											<div
												key={`page-${pageIndex}-translation-${translationIndex}`}
												className="space-y-2 mt-2"
											>
												<select
													value={translation.language}
													onChange={(e) =>
														updateTranslation(
															pageIndex,
															translationIndex,
															"language",
															e.target.value
														)
													}
													required
													className="w-full p-2 border border-gray-300 rounded-md"
												>
													<option value="" disabled>
														Select Language
													</option>
													<option value="en">English</option>
													<option value="ar">Arabic</option>
												</select>
												<textarea
													placeholder="Translation Text"
													value={translation.text}
													onChange={(e) =>
														updateTranslation(
															pageIndex,
															translationIndex,
															"text",
															e.target.value
														)
													}
													required
													className="w-full p-2 border border-gray-300 rounded-md"
												/>
												{page.translations.length > 2 && (
													<button
														type="button"
														onClick={() =>
															removeTranslation(pageIndex, translationIndex)
														}
														className="text-red-600 hover:underline"
													>
														Remove
													</button>
												)}
											</div>
										))}

										{/* Add More Translations */}
										<button
											type="button"
											onClick={() => addTranslation(pageIndex)}
											className="text-blue-600 hover:underline mt-2"
										>
											Add Translation
										</button>
									</div>
								)}
							</>
						)}
					</div>
				))}

				{/* Add Page Button */}
				<div className="flex justify-center">
					<button
						type="button"
						onClick={addPage}
						className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
					>
						Add Page
					</button>
				</div>

				{/* Submit Button */}
				<div className="flex justify-center">
					<button
						type="submit"
						disabled={loading}
						className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						{loading ? "Adding..." : "Add Book"}
					</button>
				</div>
			</form>
		</div>
	);
}
