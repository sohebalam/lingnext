"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/service/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/service/AuthContext";

export default function EditBook() {
	const { bookId } = useParams(); // Using the `useParams` hook
	const [book, setBook] = useState(null);
	const router = useRouter();
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		title: "",
		level: "",
		pages: [],
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user && !user?.isAdmin) {
			router.push("/");
		}
	}, [user, router]);

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
					level: bookData.level || "",
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

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (!over) return;

		if (active.id !== over.id) {
			const oldIndex = formData.pages.findIndex(
				(page) => page.id === active.id
			);
			const newIndex = formData.pages.findIndex((page) => page.id === over.id);

			const reorderedPages = arrayMove(formData.pages, oldIndex, newIndex);
			setFormData((prev) => ({
				...prev,
				pages: reorderedPages,
			}));
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
					<label className="block text-gray-700 font-medium">Level</label>
					<input
						type="text"
						value={formData.level}
						onChange={(e) =>
							setFormData({ ...formData, level: e.target.value })
						}
						className="w-full py-2 px-4 border rounded-md"
					/>
					<label className="block text-gray-700 font-medium">Pages</label>
				</div>

				<div>
					<label className="block text-gray-700 font-medium">Pages</label>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={formData.pages.map((page) => page.id)}
							strategy={verticalListSortingStrategy}
						>
							<div className="space-y-2">
								{formData.pages.map((page) => (
									<SortableItem key={page.id} id={page.id} />
								))}
							</div>
						</SortableContext>
					</DndContext>
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

// SortableItem.js
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="p-4 bg-white border border-gray-300 rounded-md shadow-sm"
		>
			<p className="text-gray-700 text-sm">Page ID: {id}</p>
		</div>
	);
}
