"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";
import { auth, db } from "@/app/service/firebase/config";
import UserModel from "@/models/User"; // Adjust the path as needed
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				// Fetch additional user data from Firestore
				const userDocRef = doc(db, "users", firebaseUser.uid);
				const userDocSnap = await getDoc(userDocRef);

				let isAdmin = false;
				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();
					isAdmin = userData?.isAdmin || false;
					console.log("Firestore User Data:", userData);
				} else {
					console.log("No Firestore data found for user");
				}

				// Transform Firebase user object into UserModel instance
				const userModel = new UserModel({
					uid: firebaseUser.uid,
					email: firebaseUser.email,
					name: firebaseUser.displayName || null,
					image: firebaseUser.photoURL || "",
					isAdmin: isAdmin, // Use value from Firestore
				});
				setUser(userModel);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const signIn = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

	const logOut = () => {
		return signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, signIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
