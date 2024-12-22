"use client";
import { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config"; // Firebase config
import { useParams } from "next/navigation"; // For dynamic routing
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

export default function pageDetailPage() {
	const [loading, setLoading] = useState(true);
	const [page, setpage] = useState(true);

	// Use useParams to get dynamic route parameters
	const params = useParams();
	const pageId = params.pageId; // Extract pageId from URL parameters

	console.log(pageId);

	useEffect(() => {
		if (pageId) {
			fetchpageDetails();
		}
	}, [pageId]); // Re-run when pageId changes

	// Fetch page details and pages from Firestore
	const fetchpageDetails = async () => {
		try {
			setLoading(true);

			// Fetch page data
			const pageRef = doc(db, "pages", pageId);
			const pageSnap = await getDoc(pageRef);

			if (pageSnap.exists()) {
				const pageData = pageSnap.data();
				setpage(pageData);
			} else {
				console.log("No page found for the given pageId");
			}
		} catch (error) {
			console.error("Error fetching page details:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>{pageId}</h1>
		</div>
	);
}
