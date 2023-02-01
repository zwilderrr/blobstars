import "./Marquee.css";

import { Image } from "./LandingPage";
import React from "react";
import ReactMarquee from "react-fast-marquee";

const S3_URL = "https://rockstars-nft-dev.s3.us-east-2.amazonaws.com/images/";

const images = Array(300)
	.fill("")
	.map((_, i) => `${S3_URL}${i + 1}.png`);

export function Marquee({ isMobile }) {
	return React.useMemo(() => {
		return (
			<div className="carousel-wrapper ">
				{Array(3)
					.fill("")
					.map((_, i) => (
						<div key={i}>
							<ReactMarquee gradientWidth={0} speed={40 + 10 * i}>
								{shuffle(images).map(src => (
									<Image
										src={src}
										style={{ width: isMobile ? "150px" : "200px" }}
									/>
								))}
							</ReactMarquee>
						</div>
					))}
			</div>
		);
	}, []);
}

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}
