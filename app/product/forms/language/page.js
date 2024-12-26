"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/app/service/firebase/config"; // Firebase config import
import { collection, addDoc } from "firebase/firestore"; // Firestore methods
import Language from "@/models/Languages"; // Import Language model
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/service/AuthContext";

const AddLanguageForm = () => {
	const [languageName, setLanguageName] = useState("");
	const [languageCode, setLanguageCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		if (!user?.isAdmin) {
			router.push("/");
		}
	}, [user, router]);

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (!languageName || !languageCode) {
			setError("Both language name and code are required.");
			setLoading(false);
			return;
		}

		try {
			// Create a new Language instance
			const newLanguage = new Language(languageName, languageCode);

			// Adding the new language document to Firestore using the toMap() method
			await addDoc(collection(db, "languages"), newLanguage.toMap());

			// Clear form fields after successful submission
			setLanguageName("");
			setLanguageCode("");
			setLoading(false);
			alert("Language added successfully!");
		} catch (error) {
			setError("Error adding language: " + error.message);
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-semibold text-center mb-6">
				Add New Language
			</h2>
			<form onSubmit={handleSubmit}>
				{/* Language Name Field */}
				<div className="mb-4">
					<label
						htmlFor="languageName"
						className="block text-sm font-medium text-gray-700"
					>
						Language Name
					</label>
					<input
						type="text"
						id="languageName"
						value={languageName}
						onChange={(e) => setLanguageName(e.target.value)}
						className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				{/* Language Code Field */}
				<div className="mb-4">
					<label
						htmlFor="languageCode"
						className="block text-sm font-medium text-gray-700"
					>
						Language Code
					</label>
					<input
						type="text"
						id="languageCode"
						value={languageCode}
						onChange={(e) => setLanguageCode(e.target.value)}
						className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				{/* Error Message */}
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400"
				>
					{loading ? "Adding..." : "Add Language"}
				</button>
			</form>
		</div>
	);
};

export default AddLanguageForm;
