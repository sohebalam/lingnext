"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config"; // Import Firebase config
import { useRouter } from "next/navigation"; // Import the router
import { collection, getDocs, doc, getDoc } from "firebase/firestore"; // Firestore methods
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/app/service/AuthContext";

export default function DisplayLevelsWithBooks() {
	const [levels, setLevels] = useState([]);
	const [loading, setLoading] = useState(false);
	const [expandedLevels, setExpandedLevels] = useState([]); // Track expanded levels
	const router = useRouter(); // Using the router hook
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			router.push("/");
		}
	}, [user, router]);

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true);

			try {
				// Fetch all books from the "books" collection
				const booksSnapshot = await getDocs(collection(db, "books"));
				console.log("Books Snapshot:", booksSnapshot);

				const booksData = await Promise.all(
					booksSnapshot.docs.map(async (bookDoc) => {
						const book = { id: bookDoc.id, ...bookDoc.data() };

						console.log("Book Data:", book); // Log book data to inspect it

						// Ensure pages is always an array, even if undefined or empty
						if (book.pages) {
							console.log(`Page Details for Book ${book.id}:`, book.pages); // Log the page details

							// Map page objects to their details, considering translations and other properties
							const pageDetails = book.pages.map((page) => {
								// Each page might have translations or other attributes
								return {
									id: page.id,
									translations: page.translations || [],
									isCover: page.isCover || false,
									isCollapsed: page.isCollapsed || false,
								};
							});

							book.pages = pageDetails; // Update the pages with detailed objects
						} else {
							console.log("No pages in book:", book.id); // Log if no pages exist
						}

						return book;
					})
				);

				// Group books by their level
				const levelsGrouped = booksData.reduce((acc, book) => {
					const level = book.level || "Unknown"; // Default to 'Unknown' if no level is set
					if (!acc[level]) {
						acc[level] = [];
					}
					acc[level].push(book);
					return acc;
				}, {});

				// Convert the grouped levels object into an array of level objects
				const levelsArray = Object.keys(levelsGrouped).map((level) => ({
					id: level, // Using the level name as the ID
					name: level, // Level name
					books: levelsGrouped[level],
				}));

				setLevels(levelsArray);
			} catch (error) {
				console.error("Error fetching books:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, []);

	// Toggle expanded level
	const toggleLevel = (levelId) => {
		setExpandedLevels((prev) =>
			prev.includes(levelId)
				? prev.filter((id) => id !== levelId)
				: [...prev, levelId]
		);
	};

	// Navigate to book detail page
	const handleBookClick = (bookId) => {
		router.push(`/product/book/${bookId}`); // Dynamically push to the book's page
	};

	return (
		<>
			<div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md space-y-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					Levels with Books
				</h2>
				{loading ? (
					<p>Loading...</p>
				) : (
					<div className="space-y-6">
						{levels.length > 0 ? (
							levels.map((level) => (
								<div key={level.id} className="space-y-4">
									<div>
										<h3 className="text-xl font-semibold text-gray-800 flex justify-between items-center">
											<span>{level.name}</span>
										</h3>
										<button
											onClick={() => toggleLevel(level.id)} // Toggle level accordion
											className="flex items-center space-x-2"
										>
											{expandedLevels.includes(level.id) ? (
												<ChevronUpIcon className="w-6 h-6" />
											) : (
												<ChevronDownIcon className="w-6 h-6" />
											)}
										</button>
										{expandedLevels.includes(level.id) && (
											<div className="space-y-2">
												{level.books?.length > 0 ? (
													level.books.map((book) => (
														<div
															key={book.id}
															className="flex justify-between items-center cursor-pointer"
															onClick={() => handleBookClick(book.id)} // Add onClick to navigate
														>
															<h4 className="text-lg font-medium text-gray-700">
																{book.title ?? "No title available"}
															</h4>
															<div>
																{book.pages?.map((page) => (
																	<div
																		key={page.id}
																		className="flex items-center space-x-2"
																	>
																		<span>
																			{page.isCover ? "Cover" : "Page"}:{" "}
																			{page.id}
																		</span>
																		{page.translations?.map(
																			(translation, idx) => (
																				<span
																					key={idx}
																					className="text-sm text-gray-500"
																				>
																					({translation.language}:{" "}
																					{translation.text})
																				</span>
																			)
																		)}
																	</div>
																))}
															</div>
														</div>
													))
												) : (
													<p>No books available in this level.</p>
												)}
											</div>
										)}
									</div>
								</div>
							))
						) : (
							<p>No levels found.</p>
						)}
					</div>
				)}
			</div>
		</>
	);
}
