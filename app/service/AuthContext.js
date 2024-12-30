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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

export const registerUser = async (email, password, name) => {
	const auth = getAuth();
	console.log(email, password, name);
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		// Save user data to Firestore
		// await db.collection("users").doc(user.uid).set({
		// 	name: name,
		// 	email: email,
		// 	name: name,
		// });
		await setDoc(doc(db, "users", user.uid), {
			name: name,
			email: email,
			name: name,
		});

		console.log("User registered and saved to Firestore:", user);
	} catch (error) {
		console.error("Error registering user:", error);
		throw error;
	}
};
