// "use client";
// import { useState, useEffect } from "react";
// import { db } from "@/app/service/firebase/config"; // Firebase config
// import { useParams } from "next/navigation"; // For dynamic routing
// import { doc, getDoc } from "firebase/firestore"; // Firestore methods

// export default function levelDetailPage() {
// 	const [loading, setLoading] = useState(true);
// 	const [level, setLevel] = useState(true);

// 	// Use useParams to get dynamic route parameters
// 	const params = useParams();
// 	const levelId = params.levelId; // Extract levelId from URL parameters

// 	console.log(levelId);
// 	console.log(level.name);

// 	useEffect(() => {
// 		if (levelId) {
// 			fetchlevelDetails();
// 		}
// 	}, [levelId]); // Re-run when levelId changes

// 	// Fetch level details and pages from Firestore
// 	const fetchlevelDetails = async () => {
// 		try {
// 			setLoading(true);

// 			// Fetch level data
// 			const levelRef = doc(db, "levels", levelId);
// 			const levelSnap = await getDoc(levelRef);

// 			if (levelSnap.exists()) {
// 				const levelData = levelSnap.data();
// 				setLevel(levelData);
// 			} else {
// 				console.log("No level found for the given levelId");
// 			}
// 		} catch (error) {
// 			console.error("Error fetching level details:", error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};
// 	// Handle form submission
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);

// 		try {
// 			await updateDoc(doc(db, "levels", id), formData);
// 			alert("Level updated successfully!");
// 		} catch (error) {
// 			console.error("Error updating level:", error);
// 			alert("Failed to update level.");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};
// 	if (loading) return <p>Loading...</p>;

// 	return (
// 		<div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
// 			<h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Level</h1>
// 			<form onSubmit={handleSubmit} className="space-y-4">
// 				<div>
// 					<label className="block text-gray-700 font-medium">Level Name</label>
// 					<input
// 						type="text"
// 						name="name"
// 						value={formData.name}
// 						onChange={handleChange}
// 						required
// 						className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
// 					/>
// 				</div>

// 				<button
// 					type="submit"
// 					disabled={loading}
// 					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
// 				>
// 					{loading ? "Updating..." : "Update Level"}
// 				</button>
// 			</form>
// 		</div>
// 	);
// }
"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config"; // Firebase config
import { useParams } from "next/navigation"; // For dynamic routing
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore methods

export default function LevelDetailPage() {
	const [loading, setLoading] = useState(true);
	const [level, setLevel] = useState({}); // Initially an empty object
	const [formData, setFormData] = useState({
		name: "", // Add initial formData state
	});

	// Use useParams to get dynamic route parameters
	const params = useParams();
	const levelId = params.levelId; // Extract levelId from URL parameters

	console.log(levelId);
	console.log(level.name);

	useEffect(() => {
		if (levelId) {
			fetchLevelDetails();
		}
	}, [levelId]); // Re-run when levelId changes

	// Fetch level details and pages from Firestore
	const fetchLevelDetails = async () => {
		try {
			setLoading(true);

			// Fetch level data
			const levelRef = doc(db, "levels", levelId);
			const levelSnap = await getDoc(levelRef);

			if (levelSnap.exists()) {
				const levelData = levelSnap.data();
				setLevel(levelData);
				setFormData({ name: levelData.name }); // Set formData after fetching level data
			} else {
				console.log("No level found for the given levelId");
			}
		} catch (error) {
			console.error("Error fetching level details:", error);
		} finally {
			setLoading(false);
		}
	};

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await updateDoc(doc(db, "levels", levelId), formData);
			alert("Level updated successfully!");
		} catch (error) {
			console.error("Error updating level:", error);
			alert("Failed to update level.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Level</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-gray-700 font-medium">Level Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
				>
					{loading ? "Updating..." : "Update Level"}
				</button>
			</form>
		</div>
	);
}
