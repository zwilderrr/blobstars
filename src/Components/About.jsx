import "./About.css";

import { Image } from "./LandingPage";
import gail from "../images/gail.png";
import zack from "../images/zack.png";

const staff = [
	{
		name: "Zack",
		img: zack,
		title: "Creator, BlobStarsNFT",
		title2: "Software engineer, Coinbase",
		funFact: "Pixel artist and latte enthusiast",
		link: "https://zackwilder.com",
	},
	{
		name: "Abby",
		img: gail,
		title: "Product, BlobStarsNFT",
		funFact: "Pilates master and gourmet chef",
	},
];

export function About() {
	return (
		<div className="about-wrapper">
			<div className="profile-wrapper">
				{staff.map(s => (
					<div className="profile" key={s.img}>
						<a href={s.link} alt={s.name} target="_blank" rel="noreferrer">
							<Image
								src={s.img}
								style={{ height: "200px", width: "200px", borderRadius: "50%" }}
							/>
						</a>
						<div className="about-name">{s.name}</div>
						<div className="about-title">{s.title}</div>
						{s.title2 && <div className="about-title2">{s.title2}</div>}
						<div className="about-funFact">
							<i>{s.funFact}</i>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
