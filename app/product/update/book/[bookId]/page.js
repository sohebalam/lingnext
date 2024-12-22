// "use client";
// import { useState, useEffect } from "react";
// import { db } from "@/app/service/firebase/config"; // Firebase config
// import { useParams } from "next/navigation"; // For dynamic routing
// import { doc, getDoc } from "firebase/firestore"; // Firestore methods

// export default function bookDetailPage() {
// 	const [loading, setLoading] = useState(true);
// 	const [book, setbook] = useState(true);

// 	// Use useParams to get dynamic route parameters
// 	const params = useParams();
// 	const bookId = params.bookId; // Extract bookId from URL parameters

// 	console.log(bookId);
// 	console.log(book.name);

// 	useEffect(() => {
// 		if (bookId) {
// 			fetchbookDetails();
// 		}
// 	}, [bookId]); // Re-run when bookId changes

// 	// Fetch book details and pages from Firestore
// 	const fetchbookDetails = async () => {
// 		try {
// 			setLoading(true);

// 			// Fetch book data
// 			const bookRef = doc(db, "books", bookId);
// 			const bookSnap = await getDoc(bookRef);

// 			if (bookSnap.exists()) {
// 				const bookData = bookSnap.data();
// 				setbook(bookData);
// 			} else {
// 				console.log("No book found for the given bookId");
// 			}
// 		} catch (error) {
// 			console.error("Error fetching book details:", error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div>
// 			<h1>{bookId}</h1>
// 		</div>
// 	);
// }
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/service/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditBook() {
	const { bookId } = useParams(); // Using the `useParams` hook
	const [book, setBook] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		pages: [],
	});
	const [loading, setLoading] = useState(true);

	console.log("Book ID:", bookId);

	useEffect(() => {
		if (bookId) {
			fetchBookDetails();
		}
	}, [bookId]); // Re-run when bookId changes

	// Fetch book details and pages from Firestore
	const fetchBookDetails = async () => {
		try {
			setLoading(true);

			// Fetch book data
			const bookRef = doc(db, "books", bookId);
			const bookSnap = await getDoc(bookRef);

			if (bookSnap.exists()) {
				const bookData = bookSnap.data();
				setBook(bookData);
				setFormData({
					title: bookData.title || "",
					pages: bookData.pages || [],
				});
			} else {
				console.log("No book found for the given bookId");
			}
		} catch (error) {
			console.error("Error fetching book details:", error);
		} finally {
			setLoading(false);
		}
	};

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Update book data
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const bookRef = doc(db, "books", bookId);
			await updateDoc(bookRef, formData);
			alert("Book updated successfully!");
		} catch (error) {
			console.error("Error updating book:", error);
			alert("Failed to update book.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Book</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-gray-700 font-medium">Book Title</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
					/>
				</div>
				<div>
					<label className="block text-gray-700 font-medium">Pages</label>
					<textarea
						name="pages"
						value={JSON.stringify(formData.pages, null, 2)}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								pages: JSON.parse(e.target.value || "[]"),
							}))
						}
						rows="6"
						className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
					></textarea>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
				>
					{loading ? "Updating..." : "Update Book"}
				</button>
			</form>
		</div>
	);
}
