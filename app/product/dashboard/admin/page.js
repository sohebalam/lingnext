"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config"; // Import Firebase config
import { useRouter } from "next/navigation"; // Import the router
import {
	collection,
	getDocs,
	doc,
	getDoc,
	deleteDoc,
	setDoc,
} from "firebase/firestore"; // Firestore methods
import {
	PencilIcon,
	TrashIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/solid"; // Heroicons for edit, delete, chevrons
import { useAuth } from "@/app/service/AuthContext";

export default function DisplayLevelsWithBooks() {
	const [levels, setLevels] = useState([]);
	const [loading, setLoading] = useState(false);
	const [expandedLevels, setExpandedLevels] = useState([]); // Track expanded levels
	const [expandedBooks, setExpandedBooks] = useState({}); // Track expanded books
	const router = useRouter(); // Using the router hook
	const { user } = useAuth();

	useEffect(() => {
		console.log("User:", user);
		if (user && !user?.isAdmin) {
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

	// Toggle expanded book
	const toggleBook = (levelId, bookId) => {
		setExpandedBooks((prev) => ({
			...prev,
			[levelId]: prev[levelId]?.includes(bookId)
				? prev[levelId].filter((id) => id !== bookId)
				: [...(prev[levelId] || []), bookId],
		}));
	};

	// Navigate to book edit page
	const handleEdit = (type, id, bookId = null) => {
		if (type === "book") {
			router.push(`/product/update/book/${id}`); // Edit book action
		} else if (type === "page") {
			if (bookId) {
				// Sending both pageId and bookId for page editing
				router.push(`/product/update/page/${id}/${bookId}`);
			} else {
				router.push(`/product/update/page/${id}`); // Just page editing without bookId
			}
		}
	};

	// Handle book deletion
	const deleteBook = async (levelId, bookId) => {
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this book?"
		);
		if (!isConfirmed) return;

		try {
			const bookRef = doc(db, "books", bookId);
			await deleteDoc(bookRef);
			setLevels((prevLevels) =>
				prevLevels.map((level) =>
					level.id === levelId
						? {
								...level,
								books: level.books.filter((book) => book.id !== bookId),
						  }
						: level
				)
			);
			alert("Book deleted successfully!");
		} catch (error) {
			console.error("Error deleting book:", error);
		}
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
											{/* <div className="flex space-x-4">
												<button
													onClick={() => handleEdit("level", level.id)} // Edit button for level
													className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2"
												>
													<PencilIcon className="w-5 h-5" />
													<span>Edit Level</span>
												</button>
												<button
													onClick={() => deleteLevel(level.id)} // Delete button for level
													className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-2"
												>
													<TrashIcon className="w-5 h-5" />
													<span>Delete Level</span>
												</button>
											</div> */}
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
														<div key={book.id}>
															<div className="flex justify-between items-center">
																<h4 className="text-lg font-medium text-gray-700">
																	{book.title ?? "No title available"}
																</h4>
																<div className="flex space-x-4">
																	<button
																		onClick={() => handleEdit("book", book.id)} // Edit button for book
																		className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2"
																	>
																		<PencilIcon className="w-5 h-5" />
																		<span>Edit Book</span>
																	</button>
																	<button
																		onClick={() =>
																			deleteBook(level.id, book.id)
																		} // Delete button for book
																		className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-2"
																	>
																		<TrashIcon className="w-5 h-5" />
																		<span>Delete Book</span>
																	</button>
																</div>
															</div>
															<button
																onClick={() => toggleBook(level.id, book.id)} // Toggle book accordion
																className="flex items-center space-x-2 ml-4"
															>
																{expandedBooks[level.id]?.includes(book.id) ? (
																	<ChevronUpIcon className="w-5 h-5" />
																) : (
																	<ChevronDownIcon className="w-5 h-5" />
																)}
															</button>
															{expandedBooks[level.id]?.includes(book.id) && (
																<div className="space-y-2 ml-6">
																	{book.pages?.map((page, index) => (
																		<div
																			key={`${page.id}-${index}`}
																			className="flex justify-between items-center"
																		>
																			<p className="text-sm text-gray-600">
																				Page {index + 1}: {page.name}
																			</p>
																			<div className="flex space-x-4">
																				<button
																					onClick={() =>
																						handleEdit("page", page.id, book.id)
																					} // Pass bookId along with pageId
																					className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-2"
																				>
																					<PencilIcon className="w-5 h-5" />
																					<span>Edit Page</span>
																				</button>
																				<button
																					onClick={() =>
																						deletePage(book.id, page.id)
																					} // Delete button for page
																					className="text-red-600 hover:text-red-800 text-sm flex items-center space-x-2"
																				>
																					<TrashIcon className="w-5 h-5" />
																					<span>Delete Page</span>
																				</button>
																			</div>
																		</div>
																	))}
																</div>
															)}
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
