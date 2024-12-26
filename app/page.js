"use client";
import Hero from "@/components/Hero";
import { Footer } from "../components/Footer";
import LatestBooks from "@/components/LatestBooks";
import Testimonials from "@/components/Testimonials";
import Head from "next/head";
const HomePage = () => {
	return (
		<>
			<Head>
				{/* Metadata for SEO */}
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="Discover free Arabic PDF storybooks and picture books. Enhance your Arabic reading skills with engaging stories for all ages. Perfect for learners and language enthusiasts!"
				/>
				<meta
					name="keywords"
					content="Arabic storybooks, Arabic PDF books, learn Arabic, free Arabic books, Arabic picture books, Arabic reading books, Arabic stories for kids, Arabic language learning"
				/>
				<meta name="author" content="Lingo Stories" />
				<meta name="robots" content="index, follow" />

				{/* Open Graph metadata for social sharing */}
				<meta
					property="og:title"
					content="Free Arabic Storybooks and Picture Books | Learn Arabic"
				/>
				<meta
					property="og:description"
					content="Explore free Arabic PDF storybooks and picture books to improve your Arabic reading. Perfect for language learners and enthusiasts. Start your journey today!"
				/>
				<meta
					property="og:image"
					content="https://www.yourdomain.com/images/arabic-books-cover.jpg"
				/>
				<meta property="og:url" content="https://www.yourdomain.com" />
				<meta property="og:type" content="website" />

				{/* Twitter metadata */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Free Arabic Storybooks and Picture Books | Learn Arabic"
				/>
				<meta
					name="twitter:description"
					content="Engage with free Arabic PDF storybooks and picture books to enhance your Arabic reading. Perfect for learners and book lovers!"
				/>
				<meta
					name="twitter:image"
					content="https://www.yourdomain.com/images/arabic-books-cover.jpg"
				/>

				{/* Canonical URL */}
				<link rel="canonical" href="https://www.yourdomain.com" />

				{/* Page title */}
				<title>Free Arabic Storybooks and Picture Books | Learn Arabic</title>
			</Head>

			<div style={{ position: "relative" }}>
				{/* Page sections */}
				<Hero />
				<LatestBooks />
				<Testimonials />
				{/* Uncomment below if needed */}
				{/* <Features /> */}
				<Footer />
			</div>
		</>
	);
};

export default HomePage;
