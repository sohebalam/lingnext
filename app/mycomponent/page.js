"use client";
import { useEffect, useState } from "react";
import { db } from "@/app/service/firebase/config"; // Adjust the path to your Firebase config
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export default function UserComponent() {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		// Simulate getting the authenticated user (replace with actual auth logic)
		const userId = "0V8iBvLUPEaExVRnTrFqaXSQlBM2"; // Replace this with auth.currentUser.uid

		if (userId) {
			// Firestore document reference
			const userDocRef = doc(db, "users", userId);

			// Listen to real-time updates
			const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
				if (snapshot.exists()) {
					const userData = snapshot.data();
					setUser(userData);
					setIsAdmin(userData?.isAdmin || false);
				} else {
					console.log("User does not exist in Firestore");
				}
			});

			// Cleanup listener on component unmount
			return () => unsubscribe();
		}
	}, []);

	return (
		<div>
			{user ? (
				<div>
					<h1>Welcome, {user?.email}</h1>
					<p>{isAdmin ? "You are an admin." : "You are a regular user."}</p>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	);
}
