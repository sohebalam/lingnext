"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/assets/Logo.png";
import User from "@/public/assets/User.svg";
import Link from "next/link";
import { useAuth } from "@/app/service/AuthContext";
import { useRouter } from "next/navigation";

export function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();
	const { user, logOut } = useAuth();

	const handleSignInClick = () => {
		router.push("/auth/login");
	};

	const handleLogOutClick = () => {
		logOut();
		router?.push("/");
	};
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
		<nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<div className="container mx-auto px-4 md:flex items-center gap-6 py-4">
				{" "}
				{/* Increased vertical padding here */}
				<div className="flex items-center justify-between md:w-auto w-full">
					<Link href={"/"}>
						<Image src={Logo} alt="Logo" width={30} height={30} />
					</Link>

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
					<a href="/" className="py-2 px-3 block">
						Home
					</a>
					<a href="/contact" className="py-2 px-3 block">
						Contact Us
					</a>

					{/* Dropdown menu */}
					<div className="relative">
						<button
							type="button"
							className="dropdown-toggle py-2 px-3 hover:bg-white flex items-center gap-2 rounded"
							onClick={toggleDropdown}
						>
							<span className="pointer-events-none select-none">Forms</span>
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
							<div className="dropdown-menu absolute white text-black rounded-b-lg pb-2 w-48 z-50">
								<a
									href="/product/forms/bookform"
									className="block px-6 py-2 hover:bg-white"
								>
									Book Form
								</a>
								<a
									href="/product/forms/language"
									className="block px-6 py-2 hover:bg-white"
								>
									Language Form
								</a>
							</div>
						)}
					</div>
					{/* Dropdown menu */}
					<div className="relative">
						<button
							type="button"
							className="dropdown-toggle py-2 px-3 hover:bg-white flex items-center gap-2 rounded"
							onClick={toggleDropdown}
						>
							<span className="pointer-events-none select-none">Dashboard</span>
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
							<div className="dropdown-menu absolute white text-black rounded-b-lg pb-2 w-48 z-50">
								<a
									href="/product/dashboard"
									className="block px-6 py-2 hover:bg-white"
								>
									Main Dashboard
								</a>
								<a
									href="/product/dashboard/admin"
									className="block px-6 py-2 hover:bg-white"
								>
									Admin Dashboard
								</a>
							</div>
						)}
					</div>

					{/* Mobile Navigation */}
					<div className="flex gap-x-8 items-center lg:ml-12">
						<Link href="/auth/register">
							<p className="hidden lg:block font-medium text-black text-sm lg:text-base pr-[32px]">
								Open an Account
							</p>
						</Link>
						{/* User Profile Section */}
						{user ? (
							<div className="relative flex items-center gap-x-4">
								<Image src={User} alt="User Profile" width={20} height={20} />
								<span className="hidden font-medium text-blacklg:block text-sm lg:text-base">
									{user.name}
								</span>
								<button
									className="font-medium text-black text-sm lg:text-base lg:block"
									onClick={handleLogOutClick}
								>
									Logout
								</button>
							</div>
						) : (
							<div
								className="flex items-center gap-x-4 cursor-pointer"
								onClick={handleSignInClick}
							>
								<Image src={User} alt="User Profile" width={20} height={20} />
								<Link href="/auth/login">
									<span className="hidden font-medium text-[#36485C] lg:block text-sm lg:text-base">
										Sign in
									</span>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
