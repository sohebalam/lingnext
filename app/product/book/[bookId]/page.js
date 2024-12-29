"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config"; // Firebase config
import { useParams } from "next/navigation"; // For dynamic routing
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

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
				setPages(bookData.pages || []);
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
				<div className="text-center mt-20">Loading...</div>
			</div>
		);
	}

	if (!book || pages.length === 0) {
		return (
			<div>
				<div className="text-center mt-20">No book or pages available.</div>
			</div>
		);
	}

	const currentPages = [pages[currentPage]];
	if (currentPage < pages.length - 1) {
		currentPages.push(pages[currentPage + 1]);
	}

	return (
		<div>
			<div>
				<div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
					<div className="relative flex items-center">
						{/* Left Navigation Button */}
						<div
							className="absolute left-0 transform -translate-y-1/2"
							style={{ top: "50%" }}
						>
							<div className="inline-flex">
								<button
									className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
									onClick={prevPage}
									disabled={currentPage === 0}
								>
									<ChevronLeftIcon className="w-6 h-6" /> Prev
								</button>
							</div>
						</div>

						{/* Pages Display */}
						<div className="flex justify-center items-center w-full gap-1">
							{currentPages.map((page, index) => (
								<div
									key={page.id}
									className="w-full h-[90vh] flex rounded-lg my-6 sm:w-[40rem]" // Increased width from 30rem to 40rem
								>
									<div className="w-full h-full flex flex-col justify-between items-center overflow-hidden">
										<img
											className="w-full h-full object-cover"
											src={page.image || "/fallback-image.jpg"}
											alt={`Page ${currentPage + index + 1}`}
										/>
										{!page.isCover && ( // Include translations for non-cover pages
											<div className="p-6 text-center w-full bg-white">
												<div className="text-base text-slate-800 mt-3 font-light">
													{page.translations &&
														page.translations.map((translation, i) => (
															<p key={i}>
																{translation.text ||
																	"No translation available."}
															</p>
														))}
												</div>
											</div>
										)}
									</div>
								</div>
							))}
						</div>

						{/* Right Navigation Button */}
						<div
							className="absolute right-0 transform -translate-y-1/2"
							style={{ top: "50%" }}
						>
							<div className="inline-flex">
								<button
									className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded-r"
									onClick={nextPage}
									disabled={currentPage >= pages.length - 1}
								>
									<ChevronRightIcon className="w-6 h-6" /> Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
