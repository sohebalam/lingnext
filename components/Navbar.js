"use client";

import Image from "next/image";
import Logo from "@/public/assets/Logo.png"; // You can replace with your actual logo
import { useAuth } from "@/app/service/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import User from "@/public/assets/User.svg";

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

	const toggleDashboardDropdown = () => {
		setDashboardDropdown((prev) => !prev);
	};

	const toggleFormDropdown = () => {
		setFormDropdown((prev) => !prev);
	};

	return (
		<header>
			<nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
				<ul className="navigation max-w-[90vw] flex justify-start items-center relative mx-auto py-8">
					<Link href={"/"}>
						<Image src={Logo} alt="Logo" width={30} height={30} />
					</Link>
					<input type="checkbox" id="check" />

					<span className="menu flex [&>li]:pl-8 [&>li>a]:text-left [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">
						{/* Desktop Navigation */}
						<div className="hidden lg:flex pl-[50px] gap-x-[32px]">
							{navLinks.map((item, index) => (
								<Link key={index} href={item.href}>
									<p className="text-[#36485C] font-medium text-sm lg:text-base">
										{item.name}
									</p>
								</Link>
							))}
						</div>

						<label htmlFor="check" className="close-menu text-black">
							X
						</label>
					</span>

					{/* Dropdowns */}
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
									<p className="px-4 py-2 text-sm text-black hover:bg-gray-100">
										Main Dashboard
									</p>
								</Link>
								<Link href="/product/dashboard/admin">
									<p className="px-4 py-2 text-sm text-black hover:bg-gray-100">
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
									<p className="px-4 py-2 text-sm text-black hover:bg-gray-100">
										Level Form
									</p>
								</Link>
								<Link href="/product/forms/bookform">
									<p className="px-4 py-2 text-sm text-black hover:bg-gray-100">
										Book Form
									</p>
								</Link>
								<Link href="/product/forms/language">
									<p className="px-4 py-2 text-sm text-black hover:bg-gray-100">
										Language Form
									</p>
								</Link>
							</div>
						)}
					</div>

					<label htmlFor="check" className="open-menu">
						Menu
					</label>
				</ul>
			</nav>
		</header>
	);
}
