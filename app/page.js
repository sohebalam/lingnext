"use client";
import { useRouter } from "next/compat/router";
import Hero from "@/components/Hero";
import { Footer } from "../components/Footer";
import LatestBooks from "@/components/LatestBooks";
import Testimonials from "@/components/Testimonials";

const HomePage = () => {
	const router = useRouter();

	return (
		<div>
			<Hero />
			<LatestBooks />
			<Testimonials />
			{/* <Features /> */}
			<Footer />
		</div>
	);
};

export default HomePage;
