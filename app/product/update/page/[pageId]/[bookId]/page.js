"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/app/service/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/app/service/AuthContext";

export default function EditPage() {
	const { bookId, pageId } = useParams();
	const router = useRouter();
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		id: "",
		image: "",
		isCover: false,
		translations: [{ language: "", text: "" }],
	});

	useEffect(() => {
		if (user && !user?.isAdmin) {
			router.push("/");
		}
	}, [user, router]);

	useEffect(() => {
		if (bookId && pageId) {
			fetchBookDetails();
		}
	}, [bookId, pageId]);

	const fetchBookDetails = async () => {
		try {
			setLoading(true);
			const bookRef = doc(db, "books", bookId);
			const bookSnap = await getDoc(bookRef);

			if (bookSnap.exists()) {
				const bookData = bookSnap.data();
				const page = bookData.pages.find((p) => p.id === pageId);

				if (page) {
					setFormData(page);
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

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleTranslationChange = (index, field, value) => {
		const updatedTranslations = [...formData.translations];
		updatedTranslations[index][field] = value;
		setFormData({
			...formData,
			translations: updatedTranslations,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const bookRef = doc(db, "books", bookId);
			const bookSnap = await getDoc(bookRef);

			if (bookSnap.exists()) {
				const bookData = bookSnap.data();
				const updatedPages = bookData.pages.map((page) =>
					page.id === pageId ? formData : page
				);

				await updateDoc(bookRef, { pages: updatedPages });
				alert("Page updated successfully!");
				router.push(`/product/book/${bookId}`);
			} else {
				console.log("No book found for the given bookId");
			}
		} catch (error) {
			console.error("Error updating page:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Page</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Other form fields */}
				<div>
					<label className="font-medium text-gray-700">
						Is this the cover page?
					</label>
					<input
						type="checkbox"
						name="isCover"
						checked={formData.isCover}
						onChange={handleInputChange}
						className="h-5 w-5 text-blue-600"
					/>
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
					type="submit"
					disabled={loading}
					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
				>
					{loading ? "Updating..." : "Update Page"}
				</button>
			</form>
		</div>
	);
}
