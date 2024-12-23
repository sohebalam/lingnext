"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/assets/Logo.svg";
import User from "@/public/assets/User.svg";
import Menu from "@/public/assets/Menu.svg";

const navLinks = [
	{ name: "Features" },
	{ name: "Pricing" },
	{ name: "Enterprise" },
	{ name: "Careers" },
];

export function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Toggle dropdown visibility
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown state
	};

	// Toggle mobile menu visibility
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle the mobile menu state
	};

	// Close dropdown and mobile menu when clicking outside
	const handleClickOutside = (e) => {
		if (
			!e.target.closest(".dropdown-toggle") &&
			!e.target.closest(".navigation-menu") &&
			!e.target.closest(".mobile-menu-button")
		) {
			setIsDropdownOpen(false);
			setIsMobileMenuOpen(false); // Close mobile menu when clicking outside
		}
	};

	// Add event listener on mount to handle clicking outside
	useEffect(() => {
		window.addEventListener("click", handleClickOutside);

		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<nav className="bg-sky-600 text-white">
			<div className="container mx-auto px-4 md:flex items-center gap-6">
				<div className="flex items-center justify-between md:w-auto w-full">
					<a href="#" className="py-5 px-2 text-white flex-1 font-bold">
						Webcrunch.com
					</a>

					{/* mobile menu icon */}
					<div className="md:hidden flex items-center">
						<button
							type="button"
							className="mobile-menu-button"
							onClick={toggleMobileMenu}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile menu links */}
				<div
					className={`md:flex md:flex-row flex-col items-center justify-start md:space-x-1 pb-3 md:pb-0 navigation-menu ${
						isMobileMenuOpen ? "block" : "hidden"
					}`}
				>
					<a href="#" className="py-2 px-3 block">
						Home
					</a>
					<a href="#" className="py-2 px-3 block">
						About
					</a>

					{/* Dropdown menu */}
					<div className="relative">
						<button
							type="button"
							className="dropdown-toggle py-2 px-3 hover:bg-sky-800 flex items-center gap-2 rounded"
							onClick={toggleDropdown}
						>
							<span className="pointer-events-none select-none">Services</span>
							<svg
								className="w-3 h-3 pointer-events-none"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m19.5 8.25-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</button>

						{/* Dropdown visibility based on state */}
						{isDropdownOpen && (
							<div className="dropdown-menu absolute bg-sky-700 text-white rounded-b-lg pb-2 w-48 z-50">
								<a href="#" className="block px-6 py-2 hover:bg-sky-800">
									Web Design
								</a>
								<a href="#" className="block px-6 py-2 hover:bg-sky-800">
									Web Development
								</a>
								<a href="#" className="block px-6 py-2 hover:bg-sky-800">
									SEO
								</a>
							</div>
						)}
					</div>

					<a href="#" className="py-2 px-3 block">
						Contact
					</a>
				</div>
			</div>
		</nav>
	);
}
