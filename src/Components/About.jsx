import "./About.css";
import { Image } from "./LandingPage";
import zack from "../images/zack.png";
import gail from "../images/gail.png";

const staff = [
	{
		name: "Zack",
		img: zack,
		title: "Creator @ RockstarsNFT",
		funFact: "Pixel artist and latte enthusiast",
		link: "https://zackwilder.com",
	},
	{
		name: "Abby",
		img: gail,
		title: "Product @ RockstarsNFT",
		funFact: "Yoga master and gourmet chef",
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
						<div className="about-funFact">
							<i>{s.funFact}</i>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
