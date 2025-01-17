import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
	return (
		<div className="bg-indigo-600 text-white font-extralight flex flex-col items-center justify-center gap-6 py-16">
			<div className="md:w-3/4 w-full flex flex-col md:flex-row justify-between px-4 gap-4">
				<div className="w-full mb-8">
					<div className="inline-block mb-3">
						<h2 className="text-white font-bold text-3xl">TrustMeter</h2>
					</div>
					<div className="flex flex-col gap-2">
						<Link to={"/about"}>About Us</Link>
						<Link to={"/privacy-policy"}>Privacy Policy</Link>
						<Link to={"/career"}>Terms of Service</Link>
					</div>
				</div>
				<div className="w-full mb-8">
					<h1 className="font-semibold mb-4">CONTACT US</h1>
					<div className="flex flex-col gap-2 mb-4">
						<p>Call: +9 1-xxx-xxxx</p>
						<p>Email: xxx@gmail.com</p>
					</div>
				</div>
				<div className="w-full mb-8">
					<h1 className="font-semibold mb-4">FOLLOW US ON</h1>
					<div className="flex flex-col justify-start gap-3">
						<a href="example.com" target="_blank">
							<FaFacebookF />
						</a>
						<a href="example.com" target="_blank">
							<FaTwitter />
						</a>
						<a href="example.com" target="_blank">
							<RiInstagramFill />
						</a>
					</div>
				</div>
			</div>
			<p>© 2025 TrustMeter All Rights Reserved</p>
		</div>
	);
};

export default Footer;
