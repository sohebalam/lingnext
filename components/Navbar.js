"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/assets/Logo.png";
import User from "@/public/assets/User.svg";
import Link from "next/link";
import { useAuth } from "@/app/service/AuthContext";
import { useRouter } from "next/navigation";

export function Navbar() {
	const [isFormsDropdownOpen, setIsFormsDropdownOpen] = useState(false);
	const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const router = useRouter();
	const { user, logOut } = useAuth();

	const handleSignInClick = () => {
		router.push("/auth/login");
	};

	const handleLogOutClick = () => {
		logOut();
		router.push("/");
	};

	// Toggle mobile menu
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// Close menus when clicking outside
	const handleClickOutside = (e) => {
		if (
			!e.target.closest(".dropdown-toggle") &&
			!e.target.closest(".navigation-menu") &&
			!e.target.closest(".mobile-menu-button")
		) {
			setIsFormsDropdownOpen(false);
			setIsDashboardDropdownOpen(false);
			setIsMobileMenuOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
			<div className="container mx-auto px-4 md:flex items-center gap-6 py-4">
				{/* Logo Section */}
				<div className="flex items-center justify-between w-full md:w-auto">
					<Link href={"/"}>
						<Image src={Logo} alt="Logo" width={30} height={30} />
					</Link>

					{/* Mobile menu icon */}
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

				{/* Navigation Links */}
				<div
					className={`md:flex md:flex-row flex-col items-center justify-start md:space-x-1 pb-3 md:pb-0 navigation-menu ${
						isMobileMenuOpen ? "block" : "hidden"
					}`}
				>
					<a href="/" className="py-2 px-3 block">
						Home
					</a>
					<a href="/support" className="py-2 px-3 block">
						Support Us
					</a>

					{/* Forms Dropdown */}
					{user && user.isAdmin ? (
						<div className="relative">
							<button
								type="button"
								className="dropdown-toggle py-2 px-3 flex items-center gap-2"
								onClick={() => setIsFormsDropdownOpen(!isFormsDropdownOpen)}
							>
								Forms
								<svg
									className="w-3 h-3"
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
							{isFormsDropdownOpen && (
								<div className="dropdown-menu">
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
					) : null}
					{/* Dashboard Dropdown */}
					<div className="relative">
						<button
							type="button"
							className="dropdown-toggle py-2 px-3 flex items-center gap-2"
							onClick={() =>
								setIsDashboardDropdownOpen(!isDashboardDropdownOpen)
							}
						>
							Dashboard
							<svg
								className="w-3 h-3"
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
						{isDashboardDropdownOpen && (
							<div className="dropdown-menu absolute bg-white text-black rounded-b-lg pb-2 w-48 z-50">
								<a
									href="/product/dashboard"
									className="block px-6 py-2 hover:bg-gray-100"
								>
									Main Dashboard
								</a>
								{user && user?.isAdmin ? (
									<a
										href="/product/dashboard/admin"
										className="block px-6 py-2 hover:bg-gray-100"
									>
										Admin Dashboard
									</a>
								) : null}
							</div>
						)}
					</div>
				</div>

				{/* User Actions */}
				<div className="flex items-center gap-x-4 ml-auto">
					{user ? (
						<div className="flex items-center gap-x-2">
							<Image src={User} alt="User Profile" width={20} height={20} />
							<span className="hidden lg:block font-medium text-black text-sm lg:text-base">
								{user.name}
							</span>
							<button
								className="font-medium text-black text-sm lg:text-base"
								onClick={handleLogOutClick}
							>
								Logout
							</button>
						</div>
					) : (
						<button
							onClick={handleSignInClick}
							className="flex items-center gap-x-2 text-black"
						>
							<Image src={User} alt="User Profile" width={20} height={20} />
							<span className="hidden lg:block font-medium text-sm lg:text-base">
								Sign In
							</span>
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}
