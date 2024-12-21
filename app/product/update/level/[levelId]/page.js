"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config"; // Firebase config
import { useParams } from "next/navigation"; // For dynamic routing
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

export default function levelDetailPage() {
	const [loading, setLoading] = useState(true);
	const [level, setLevel] = useState(true);

	// Use useParams to get dynamic route parameters
	const params = useParams();
	const levelId = params.levelId; // Extract levelId from URL parameters

	console.log(levelId);
	console.log(level.name);

	useEffect(() => {
		if (levelId) {
			fetchlevelDetails();
		}
	}, [levelId]); // Re-run when levelId changes

	// Fetch level details and pages from Firestore
	const fetchlevelDetails = async () => {
		try {
			setLoading(true);

			// Fetch level data
			const levelRef = doc(db, "levels", levelId);
			const levelSnap = await getDoc(levelRef);

			if (levelSnap.exists()) {
				const levelData = levelSnap.data();
				setLevel(levelData);
			} else {
				console.log("No level found for the given levelId");
			}
		} catch (error) {
			console.error("Error fetching level details:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>{levelId}</h1>
		</div>
	);
}
