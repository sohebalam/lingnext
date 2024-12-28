import Image from "next/image";
import Link from "next/link";

const SupportUs = () => {
	return (
		<div className="bg-gradient-to-r white min-h-screen py-16 px-8 md:px-20 flex flex-col items-center">
			{/* Hero Section */}
			<section className="text-center max-w-3xl mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
					Support Lingo Tales
				</h1>
				<p className="text-lg md:text-xl text-gray-600">
					Hi there! I’m Soheb, a passionate language enthusiast, and I’m working
					part-time to help people learn new languages through engaging stories
					and resources.
				</p>
				<p className="text-lg md:text-xl text-gray-600 mt-4">
					Your support can help me dedicate more time and effort to creating
					high-quality content. If we reach enough contributions, I’ll be able
					to expand this project into something truly amazing!
				</p>
			</section>

			{/* Support Options */}
			<section className="flex flex-col md:flex-row items-center justify-center gap-6">
				<button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow-lg text-lg font-semibold">
					<Link
						href="https://www.buymeacoffee.com/sohebalam"
						target="_blank"
						rel="noopener noreferrer"
					>
						Buy Me a Coffee
					</Link>
				</button>
				<button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg text-lg font-semibold">
					<Link
						href="https://paypal.me/lingotales"
						target="_blank"
						rel="noopener noreferrer"
					>
						Support via PayPal
					</Link>
				</button>
			</section>

			{/* Future Goals */}
			<section className="mt-16 max-w-3xl text-center">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
					Your Support Matters
				</h2>
				<p className="text-lg md:text-xl text-gray-600">
					With your help, I can:
				</p>
				<ul className="text-lg md:text-xl text-gray-600 list-disc mt-4 space-y-2 pl-8">
					<li>Create more language-learning e-books and resources.</li>
					<li>
						Introduce interactive tools to make learning fun and effective.
					</li>
					<li>Offer content for diverse language levels and interests.</li>
				</ul>
			</section>

			{/* Thank You Section */}
			<section className="mt-12 text-center max-w-3xl">
				<h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
					Thank You for Supporting Lingo Tales!
				</h3>
				<p className="text-lg md:text-xl text-gray-600">
					Every contribution, no matter how small, makes a huge difference.
					Together, we can make language learning accessible and enjoyable for
					everyone.
				</p>
			</section>
		</div>
	);
};

export default SupportUs;
