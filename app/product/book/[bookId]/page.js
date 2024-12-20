"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config"; // Firebase config
import { useParams } from "next/navigation"; // For dynamic routing
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { Navbar } from "@/app/components/Navbar";

export default function BookDetailPage() {
	const [book, setBook] = useState(null);
	const [pages, setPages] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(true);

	// Use useParams to get dynamic route parameters
	const params = useParams();
	const bookId = params.bookId; // Extract bookId from URL parameters

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

				// Log book data for debugging
				console.log("Fetched Book Data:", bookData);

				// Directly get pages array from book data
				const bookPages = bookData.pages || [];
				console.log("Book Pages:", bookPages); // Log to check book pages

				// Check if bookPages is an array
				if (!Array.isArray(bookPages)) {
					console.error(
						"Expected an array of pages but got:",
						typeof bookPages
					);
					return;
				}

				// Validate each page's structure
				const validPages = bookPages
					.map((page, index) => {
						if (typeof page !== "object" || !page.id) {
							console.error(`Invalid page structure at index ${index}:`, page);
							return null;
						}

						return {
							id: page.id,
							image: page.image || null,
							originalText: page.originalText || null,
							translations: page.translations || [],
							isCover: page.isCover || false,
							isCollapsed: page.isCollapsed || false,
						};
					})
					.filter((page) => page !== null); // Filter out invalid pages

				setPages(validPages);
			} else {
				console.log("No book found for the given bookId");
			}
		} catch (error) {
			console.error("Error fetching book details:", error);
		} finally {
			setLoading(false);
		}
	};

	// Handle next and previous page navigation
	const nextPage = () => {
		if (currentPage < pages.length - 1) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	if (loading) {
		return (
			<div>
				<Navbar />
				<div className="text-center mt-20">Loading...</div>
			</div>
		);
	}

	if (!book || pages.length === 0) {
		return (
			<div>
				<Navbar />
				<div className="text-center mt-20">No book or pages available.</div>
			</div>
		);
	}

	const page = pages[currentPage];

	return (
		<div>
			<Navbar />
			<div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md space-y-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">{book.name}</h2>
				<div className="flex justify-center items-center">
					<img
						src={page.image || "/fallback-image.jpg"}
						alt={`Page ${currentPage + 1}`}
						className="max-w-full h-auto"
					/>
				</div>
				<div className="mt-4 text-center">
					<p className="text-lg">
						{page.originalText || "No text available for this page."}
					</p>
					{page.translations && page.translations.length > 0 && (
						<div>
							<p className="text-lg mt-2 text-blue-500">
								{page.translations[0].text || "No translation available."}
							</p>
						</div>
					)}
				</div>
				<div className="flex justify-between mt-8">
					<button
						onClick={prevPage}
						className="px-4 py-2 bg-blue-500 text-white rounded-md"
						disabled={currentPage === 0}
					>
						Previous
					</button>
					<button
						onClick={nextPage}
						className="px-4 py-2 bg-blue-500 text-white rounded-md"
						disabled={currentPage === pages.length - 1}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}
