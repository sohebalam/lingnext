"use client";

import Image from "next/image";
import Logo from "@/public/assets/Logo.png";
import User from "@/public/assets/User.svg";
import Menu from "@/public/assets/Menu.svg";
import { useAuth } from "@/app/service/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Contact Us", href: "/contact" },
	{ name: "Languages", href: "/product/forms/language" },
];

export function Navbar() {
	const { user, logOut } = useAuth();
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [dashboardDropdown, setDashboardDropdown] = useState(false);
	const [formDropdown, setFormDropdown] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSignInClick = () => {
		router.push("/auth/login");
	};

	const handleLogOutClick = () => {
		logOut();
		router.push("/");
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const toggleDashboardDropdown = () => {
		setDashboardDropdown((prev) => !prev);
	};

	const toggleFormDropdown = () => {
		setFormDropdown((prev) => !prev);
	};

	return (
		<nav className="flex w-full items-center justify-between px-[16px] py-[12px] lg:container lg:mx-auto lg:px-20">
			<div className="flex items-center">
				<Link href={"/"}>
					<Image src={Logo} alt="Logo" width={30} height={30} />
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex pl-[50px] gap-x-[32px]">
					{navLinks.map((item, index) => (
						<Link key={index} href={item.href}>
							<p className="text-[#36485C] font-medium text-sm lg:text-base">
								{item.name}
							</p>
						</Link>
					))}

					{/* Dashboard Dropdown */}
					<div className="relative">
						<p
							className="text-[#36485C] font-medium cursor-pointer text-sm lg:text-base"
							onClick={toggleDashboardDropdown}
						>
							Dashboard
						</p>
						{dashboardDropdown && (
							<div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
								<Link href="/product/dashboard">
									<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
										Main Dashboard
									</p>
								</Link>
								<Link href="/product/dashboard/admin">
									<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
										Admin Panel
									</p>
								</Link>
							</div>
						)}
					</div>

					{/* Forms Dropdown */}
					<div className="relative">
						<p
							className="text-[#36485C] font-medium cursor-pointer text-sm lg:text-base"
							onClick={toggleFormDropdown}
						>
							Forms
						</p>
						{formDropdown && (
							<div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
								<Link href="/product/forms">
									<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
										Level Form
									</p>
								</Link>
								<Link href="/product/forms/bookform">
									<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
										Book Form
									</p>
								</Link>
								<Link href="/product/forms/language">
									<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
										Language Form
									</p>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className="flex gap-x-4 items-center">
				<p className="hidden lg:block font-medium text-[#36485C] text-sm lg:text-base pr-[32px]">
					Open an Account
				</p>

				{/* User Profile Section */}
				{user ? (
					<div className="relative">
						<div className="flex items-center gap-x-2 cursor-pointer">
							<Image src={User} alt="User Profile" width={20} height={20} />
							<span className="hidden font-medium text-[#36485C] lg:block text-sm lg:text-base">
								{user.name}
							</span>
							<button
								className="font-medium text-[#36485C] text-sm lg:text-base lg:block"
								onClick={handleLogOutClick}
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<div
						className="flex items-center gap-x-2 cursor-pointer"
						onClick={handleSignInClick}
					>
						<Image src={User} alt="User Profile" width={20} height={20} />
						<span className="hidden font-medium text-[#36485C] lg:block text-sm lg:text-base">
							Sign in
						</span>
					</div>
				)}

				{/* Hamburger Menu */}
				<Image
					src={Menu}
					alt="Menu Button"
					className="lg:hidden cursor-pointer"
					onClick={toggleMobileMenu} // Toggle mobile menu on click
				/>
			</div>

			{/* Mobile Dropdown Menu */}
			{mobileMenuOpen && (
				<div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-50">
					<div className="flex flex-col items-center gap-y-4">
						{navLinks.map((item, index) => (
							<Link key={index} href={item.href} onClick={toggleMobileMenu}>
								<p className="text-[#36485C] font-medium text-sm">
									{item.name}
								</p>
							</Link>
						))}

						{/* Dashboard Dropdown for Mobile */}
						<div className="relative">
							<p
								className="text-[#36485C] font-medium cursor-pointer text-sm"
								onClick={toggleDashboardDropdown}
							>
								Dashboard
							</p>
							{dashboardDropdown && (
								<div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
									<Link href="/product/dashboard">
										<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
											Main Dashboard
										</p>
									</Link>
									<Link href="/product/dashboard/admin">
										<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
											Admin Panel
										</p>
									</Link>
								</div>
							)}
						</div>

						{/* Forms Dropdown for Mobile */}
						<div className="relative">
							<p
								className="text-[#36485C] font-medium cursor-pointer text-sm"
								onClick={toggleFormDropdown}
							>
								Forms
							</p>
							{formDropdown && (
								<div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
									<Link href="/product/forms">
										<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
											Level Form
										</p>
									</Link>
									<Link href="/product/forms/bookform">
										<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
											Book Form
										</p>
									</Link>
									<Link href="/product/forms/language">
										<p className="px-4 py-2 text-sm text-[#36485C] hover:bg-gray-100">
											Language Form
										</p>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}