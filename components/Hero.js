"use client";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

function Hero() {
	return (
		<div className="mb-[2rem]">
			<header className="grid !min-h-[49rem] bg-gray-900 px-8">
				<div className="container mx-auto mt-32 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
					<div className="col-span-1">
						<h1 class="text-white mb-4 text-5xl font-bold">
							Your Perfect <br /> Learning App
						</h1>
						<p className="text-white mb-7 md:pr-16 xl:pr-28">
							Our app is here to empower you on your quest for knowledge,
							anytime and anywhere.
						</p>

						<h2 class="text-white mb-4 text-xl font-semibold">Get the app</h2>
						<div className="flex flex-col gap-2 md:mb-2 md:w-10/12 md:flex-row">
							{/* <Button
								size="lg"
								color="white"
								className="flex justify-center items-center gap-3"
							>
								<Image
									width={256}
									height={256}
									src="/assets/logo-apple.png"
									alt="metamask"
									className="w-6 h-6"
								/>
								App Store
							</Button> */}
							<Button
								size="lg"
								color="white"
								className="flex justify-center items-center gap-3 p-3 pr-5"
							>
								<Image
									width={256}
									height={256}
									src="/assets/Google-Play-icon-logo.png"
									alt="metamask"
									className="w-9 h-6"
								/>
								Google Play
							</Button>
						</div>
					</div>
					<Image
						width={470}
						height={576}
						src="/assets/mobile2.png"
						alt="team work"
						className="col-span-1 my-20 h-full max-h-[28rem] -translate-y-32 md:max-h-[28rem] lg:my-0 lg:ml-auto lg:max-h-[35rem] lg:translate-y-0"
					/>
				</div>
			</header>
			<div className="mx-8 lg:mx-16 -mt-24 rounded-xl bg-white p-5 md:p-14 shadow-md">
				<div>
					<Typography variant="h3" color="blue-gray" className="mb-3">
						Learning App
					</Typography>
					<p class="font-normal text-gray-500 lg:w-5/12">
						"Download our app to explore a delightful library of picture books
						and stories designed to make language learning fun and
						natural—perfect for learners of all ages and levels! Start your
						journey today and unlock the joy of learning through storytelling."
					</p>
				</div>
			</div>
		</div>
	);
}
export default Hero;
