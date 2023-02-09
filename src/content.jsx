import { ReactComponent as TwitterIcon } from "./images/twitter.svg";
import { scrollToTop } from "./Components/Header";

export const socialMediaLinks = [
	// {
	// 	iconClass: "fab fa-discord",
	// 	name: "discord",
	// 	href: "https://discord.gg/Hb6EezYRCH",
	// },
	{
		name: "twitter",
		href: "https://twitter.com/blobstars_nft",
		component: <TwitterIcon className="fab" alt="twitter" />,
	},

	// {
	// 	iconClass: "fab fa-instagram",
	// 	name: "instagram",
	// },
	// {
	// 	iconClass: "fab fa-tiktok",
	// 	name: "tiktok",
	// },
];

export const tweet =
	"https://twitter.com/intent/tweet?text=Finally%20achieved%20BlobStar%20status%21%20Mint%20your%20own%BlobStar%20NFT%20at%20https%3A//blobstar.io%20and%20check%20out%20the%20%23BlobStars_NFT%20collection%20at%20https%3A//opensea.com&hashtags=BlobStars_NFT%2CEIP-4844%2C%2CNFT%2CNFTart";

export const termsLink = { name: "terms", href: "/terms" };

export const ctaText = [
	<span>
		<span style={{ fontSize: "larger" }}>BlobStarsNFT</span> is a community of
		10,000 uniquely generated NFTs blobin' out on the Mumbai network.
	</span>,
	"They're blobs, so they live big, but they're cartoons, so they're fun and friendly (and even a bit mischievous)!",
	"Follow us on Twitter for project updates.",
];

export const twitterPage = (
	<a
		href="https://twitter.com/blobstars_nft"
		className="external-link"
		alt="blobstars_nft_twitter"
		target="_blank"
		rel="noreferrer"
	>
		Twitter
	</a>
);

export const tikTokPage = (
	<a
		href="https://www.tiktok.com/@blobstars_nft"
		className="external-link"
		alt="rockstars_nft_tik_tok"
		target="_blank"
		rel="noreferrer"
	>
		TikTok
	</a>
);

export const timelineText = [
	{
		percent: 10,
		title: "Pre-sale",
		description:
			"Join our Discord server and follow us on Twitter for exclusive giveaways and pre-sale drops",
	},
	{
		percent: 20,
		title: "Public launch",
		description: "Mint a BlobStarNFT and live the dream",
	},
	// {
	// 	percent: 40,
	// 	title: "RockVenuesNFT",
	// 	description:
	// 		"Invite your BlobStar friends and other NFTs to get the party started",
	// },
	// {
	// 	percent: 60,
	// 	title: "RockFansNFT",
	// 	description: "Build a following and form your own BandDAO",
	// },
	{
		percent: 80,
		title: "Metaverse",
		description: "Taking it to the next level, in the next level",
	},
];
// export const timelineText = [
// 	{
// 		percent: 10,
// 		title: "Pre-sale",
// 		description:
// 			"Join our Discord server and follow us on Twitter for exclusive giveaways and pre-mint drops",
// 	},
// 	{
// 		percent: 20,
// 		title: "Public launch",
// 		description: "Mint a BlobStar and live the dream",
// 	},
// 	{
// 		percent: 40,
// 		title: "RockVenues NFT",
// 		description:
// 			"Invite your BlobStar friends and other NFTs to get the party started",
// 	},
// 	{
// 		percent: 60,
// 		title: "RockFans NFT",
// 		description: "Build a following and form your own BandDAO",
// 	},
// 	{
// 		percent: 90,
// 		title: "Metaverse",
// 		description: "Taking it to the next level, in the next level",
// 	},
// ];

export const rareText = [
	"When you mint a BlobStar, you mint a vote for humanity. You proudly state that life is not a zero-sum game. It's a game of big and little triumphs, big and little acts of kindness, and it is only won when everyone wins.",
	<span>
		When you <i>are</i> a BlobStar, you're a good person living an epic
		life—even if epic just means treating the local barista really nicely.
	</span>,
];
// "Life isn't a choice between being rich and powerful but not a nice person doing not nice things, or being kind and giving but feeling small and unimportant.",

// export const whyText = [
// 	"When you mint a BlobStar you choose to live an epic life of humble grandeur.",
// 	"BlobStars are famous but treat their neighborhood barista really nicely. They're start-up founders and philosophers and quiet revolutionaries but help clean up their local park even when no one is looking. They're genuine, sincere people who do the right thing and know how to have a blast doing it.",
// 	"A BlobStar is everything. Because they're blobs--so they chill, but they're cartoons, so they're always there for you.",
// 	"When you mint a BlobStar, you mint a vote for humanity. You mint a vote for what's good and right in the world. You put yourself on the winning team and become a force of good in the world. You say that life is not a zero sum game--it's a game of big success and big kindness and it's only won when everyone wins.",
// ];

// export const rareText = [
// 	"Rare, ultra-rare, and hyper-rare BlobStars are ready to blob and roll",
// <div
// 	style={{ textDecoration: "underline", cursor: "pointer" }}
// 	onClick={() => scrollToTop(200)}
// >
// 	Mint yours now
// </div>,
// ];
export const whyText = [
	"That's the ethos we wanted to bring to the world, and that's why we created BlobStarsNFT. They're blobs, so they live big, but they're cartoons, so they're fun and friendly (and even a bit mischievous)!",
	"Rare, ultra-rare, and hyper-rare BlobStars are ready to blob and roll.",
	// "Mint one now and live the dream.",
];

// export const whyText = "Gain instant access to a community of epic people living epic lives.",

// export const whyText = [
// 	"When you mint a BlobStar, you join a community of people who are awesome, fun and friendly.",
// 	"BlobStars are famous but treat their neighborhood barista really nicely. They're start-up founders and philosophers and revolutionaries but help clean up their local park even when no one is looking.",
// 	"A BlobStar is everything. Because they're blobs--so they chill, but they're cartoons, so they're always there for you.",
// 	"Mint one now and join the band.",
// ];
// export const whyText = [
// 	"When you mint a BlobStar, you join a community of people who are awesome, fun and friendly. You choose to live an epic life of humble grandeur.",
// 	"BlobStars are famous but treat their neighborhood barista really nicely. They're start-up founders and philosophers and quiet revolutionaries but help clean up their local park even when no one is looking. They have a blast just being kind, good people.",
// 	"A BlobStar is everything. Because they're blobs--so they chill, but they're cartoons, so they're always there for you.",
// 	"Mint one now and join the band.",
// ];
// export const whyText = [
// 	"When you mint a BlobStar, you join a community of people who are awesome, fun and friendly. You choose to live an epic life of humble grandeur.",
// 	"BlobStars are famous but treat their neighborhood barista really nicely. They're start-up founders and philosophers and quiet revolutionaries but help clean up their local park even when no one is looking. They have a blast just being kind, good people.",
// 	"A BlobStar is everything. Because they're blobs--so they chill, but they're cartoons, so they're always there for you.",
// 	"When you mint a BlobStar, you mint a vote for humanity. You say that life is not a zero sum game--it's a game of big success and big kindness and it's only won when everyone wins.",
// 	"Mint a BlobStar now and join the cause.",
// ];
// export const whyText = [
// 	"BlobStarsNFT is a community of people who are awesome, fun and friendly. When you mint a BlobStar you choose to live an epic life of humble grandeur.",
// 	"BlobStars are famous but treat their neighborhood barista really nicely. They're start-up founders and philosophers and quiet revolutionaries but help clean up their local park even when no one is looking. They're genuine, sincere people who do the right thing and know how to have a blast doing it.",
// 	"A BlobStar is everything. Because they're blobs--so they chill, but they're cartoons, so they're always there for you.",
// 	"When you mint a BlobStar, you mint a vote for humanity. You mint a vote for what's good and right in the world. You put yourself on the winning team and become a force of good in the world. You say that life is not a zero sum game--it's a game of big success and big kindness and it's only won when everyone wins.",
// 	"Mint a BlobStar now and join the cause.",
// ];
// export const whyText = [
// 	"Gain access to a community of people who are epic, fun and friendly. Life is not a choice between being rich, successful, and famous but not a nice person doing not nice things, or being good and kind and giving, but feeling unimportant.",
// 	"Life is about being famous, but treating the local barista really nicely. About being a revolutionary, but volunteering at the food bank with a smile. About being a paradigm-altering philosopher, but taking the time to tutor underprivileged kids. Or just about having integrity, being a kind, sincere, genuine person who does the right thing--but knows how to have a great time.",
// 	"A BlobStar is both and everything. Because they're blobs--so they chill, but they're cartoons, so they're always there for you.",
// 	"When you mint a BlobStar, you mint a vote for humanity. You mint a vote for what's good and right in the world. You put yourself on the winning team and become a force of good in the world.",
// 	"Get the picture? Mint a BlobStar now and join the movement.",
// ];

// Life isn't a choice between being rich and powerful but not a nice person doing not nice things, or being kind and giving but feeling unimportant. Our Response? A fun, friendly community of good people living epic lives--even if epic just meant treating the local barista nicely.

// Life felt like a choice between being rich and powerful but not a nice person doing not nice things, or being kind and giving but feeling unimportant. Our response? A fun, friendly community of good people living epic lives, even if epic just meant treating the local barista well
