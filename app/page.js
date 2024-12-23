"use client";
import { useRouter } from "next/compat/router";
import Hero from "@/components/Hero";
import { Footer } from "../components/Footer";
import LatestBooks from "@/components/LatestBooks";
import Testimonials from "@/components/Testimonials";

const HomePage = () => {
	const router = useRouter();

	const navbarHeight = 80;

	return (
		<div
			style={{
				// paddingTop: `${navbarHeight + 1}rem`, // Add a bit of extra padding to make sure the content is spaced out properly
				position: "relative",
			}}
		>
			<Hero />
			<LatestBooks />
			<Testimonials />
			{/* <Features /> */}
			<Footer />
		</div>
	);
};

export default HomePage;
