"use client";
import { useRouter } from "next/compat/router";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

const HomePage = () => {
	const router = useRouter();

	return (
		<div>
			<Hero />
			<Features />
			<Footer />
		</div>
	);
};

export default HomePage;
