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
	// { name: "Pageform", href: "/product/forms/bookform" },
	// { name: "Forms", href: "/product/forms" },
	{ name: "Languages", href: "/product/forms/language" },
];

export function Navbar() {
	const { user, logOut } = useAuth();
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [dashboardDropdown, setDashboardDropdown] = useState(false); // State for dashboard dropdown
	const [formDropdown, setFormDropdown] = useState(false); // State for dashboard dropdown

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
		<nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20">
			<div className="flex items-center">
				<Link href={"/"}>
					<Image src={Logo} alt="Logo" width={35} height={35} />
				</Link>

				<div className="hidden lg:flex pl-[74px] gap-x-[56px]">
					{navLinks.map((item, index) => (
						<Link key={index} href={item.href}>
							<p className="text-[#36485C] font-medium">{item.name}</p>
						</Link>
					))}

					{/* Dashboard Dropdown */}
					<div className="relative">
						<p
							className="text-[#36485C] font-medium cursor-pointer"
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
							className="text-[#36485C] font-medium cursor-pointer"
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

			<div className="flex gap-x-5 items-center">
				<p className="hidden lg:block font-medium text-[#36485C] pr-[56px]">
					Open an Account
				</p>

				{user ? (
					<div className="relative">
						<div className="flex items-center gap-x-2 cursor-pointer">
							<Image src={User} alt="User Profile" />
							<span className="hidden font-medium text-[#36485C] lg:block">
								{user.name}
							</span>
							<button
								className="font-medium text-[#36485C] lg:block"
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
						<Image src={User} alt="User Profile" />
						<span className="hidden font-medium text-[#36485C] lg:block">
							Sign in
						</span>
					</div>
				)}

				<Image src={Menu} alt="Menu Button" className="lg:hidden" />
			</div>
		</nav>
	);
}
