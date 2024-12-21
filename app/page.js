"use client";
import { useRouter } from "next/compat/router";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const HomePage = () => {
	const router = useRouter();

	return (
		<div>
			<Navbar />
			<Hero />
			<Features />
			<Footer />
		</div>
	);
};

export default HomePage;
