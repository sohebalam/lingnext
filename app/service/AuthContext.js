"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";
import { auth } from "@/app/service/firebase/config";
import UserModel from "@/models/User"; // Adjust the path as needed

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				// Transform Firebase user object into UserModel instance
				const userModel = new UserModel({
					uid: firebaseUser.uid,
					email: firebaseUser.email,
					name: firebaseUser.displayName || null,
					image: firebaseUser.photoURL || "",
					isAdmin: false, // Update this based on your application's admin logic
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
