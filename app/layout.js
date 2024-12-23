import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/service/AuthContext";
import { Navbar } from "../components/Navbar";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Lingo Tales",
	description: "Learn languages through stories",
};
export default function RootLayout({ children }) {
	const navbarHeight = 80;
	return (
		<html lang="en">
			<AuthProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					style={{ paddingTop: `${navbarHeight}px` }}
				>
					<Navbar />
					{children}
				</body>
			</AuthProvider>
		</html>
	);
}
