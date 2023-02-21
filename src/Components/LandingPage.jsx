import "./LandingPage.css";

import { COINBASE_EXTENSION_URL, COINBASE_WALLET_URL } from "./Header";
import { ctaText, rareText, whyText } from "../content";
import { useEffect, useRef, useState } from "react";

import { About } from "./About";
import { ContentModal } from "./ContentModal";
import { ReactComponent as Heading } from "../images/heading-text.svg";
import { Marquee } from "./Marquee";
import { MintButton } from "./MintButton";
import { Timeline } from "./Timeline";
import blobstarMain from "../images/blobstar-main.png";
import heat from "../images/heat.png";
import multicolor from "../images/multicolor.png";

export const useOnScreen = (ref, cb, isMobile = false) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				cb && cb(!entry.isIntersecting);
				setIsVisible(entry.isIntersecting);
			},
			{
				rootMargin: "0px",
				threshold: cb ? (isMobile ? 0.52 : 0.8) : 0,
				// threshold: cb ? 0.8 : 0,
			}
		);

		const currentElement = ref?.current;

		if (currentElement) {
			observer.observe(currentElement);
		}

		return () => {
			observer && observer.unobserve(currentElement);
		};
	}, []);

	return isVisible;
};

function useSetShow(isVisible) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		isVisible && setShow(true);
	}, [isVisible]);

	return show;
}

export function Image({ src, style = {}, show = true }) {
	return (
		<div className={`${show ? "fadeIn" : "not-visible"}`}>
			<img
				src={src}
				alt="BlobStarsNFT"
				width="100%"
				style={style}
				loading="lazy"
			/>
		</div>
	);
}

export function LandingPage({ web3, Contract, isMobile, setShrinkHeader }) {
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const isVisible1 = useOnScreen(ref1);
	const isVisible2 = useOnScreen(ref2);
	useOnScreen(ref3, setShrinkHeader, true);

	const show1 = useSetShow(isVisible1);
	const show2 = useSetShow(isVisible2);

	const [txHash, setTxHash] = useState();
	const [modalOpen, setModalOpen] = useState(false);
	const [txStatus, setTxStatus] = useState("");

	useEffect(() => {
		if (txStatus) {
			setModalOpen(true);
		}
	}, [txStatus]);

	function getHelperText() {
		if (isMobile) {
			return (
				<div className="fadeIn" style={{ animationDelay: "2.6s" }}>
					On mobile? Go to blobstars.io on the{" "}
					<a
						href={COINBASE_WALLET_URL}
						className="external-link"
						alt="coinbase wallet download"
						target="_blank"
						rel="noreferrer"
					>
						Coinbase wallet
					</a>{" "}
					app browser
				</div>
			);
		}

		if (!web3) {
			return (
				<div className="fadeIn helper-text" style={{ animationDelay: "2.6s" }}>
					Looks like you don't have a crypto wallet installed on your browser.
					Download{" "}
					<a
						href={COINBASE_EXTENSION_URL}
						className="external-link"
						alt="coinbase wallet download"
						target="_blank"
						rel="noreferrer"
					>
						Coinbase wallet extension
					</a>{" "}
					to get started.
				</div>
			);
		}
	}

	return (
		<div>
			<div className="first" ref={ref3}>
				<div>
					<Marquee isMobile={isMobile} />
				</div>
				<div className="banner-text">
					<Heading />
				</div>
				<div className="row">
					{isMobile && <Image src={blobstarMain} />}
					<div className="col-left">
						<div className="cta-text-wrapper">
							{ctaText.map((line, i) => (
								<div
									key={i}
									style={{ animationDelay: `${0.5 + 0.6 * i}s` }}
									className="cta-text fadeInUp"
								>
									{line}
								</div>
							))}
						</div>

						{!isMobile && getHelperText()}
					</div>
					<div className="spacer" />
					<div className="col-right">
						{!isMobile && <Image src={blobstarMain} />}
						{/* {isMobile && getHelperText()} */}
					</div>
				</div>
			</div>

			<div className="bgwhite">
				<div className="row">
					<div className="col-right">
						<Image src={heat} show={show1} />
					</div>
					<div className="spacer" />
					<div className="col-left">
						<div className="body-text-wrapper" ref={ref1}>
							{rareText.map((line, i) => (
								<div
									key={i}
									style={{ animationDelay: ".5s" }}
									className={`body-text ${show1 ? "fadeInUp" : ""}`}
								>
									{line}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="row">
					{isMobile && <Image src={multicolor} show={show2} />}
					<div className="col-left">
						<div className="body-text-wrapper" ref={ref2}>
							{whyText.map((line, i) => (
								<div
									key={i}
									style={{ animationDelay: ".5s" }}
									className={`body-text ${show2 ? "fadeInUp" : ""}`}
								>
									{line}
								</div>
							))}
						</div>
					</div>
					<div className="spacer" />
					<div className="col-right">
						{!isMobile && <Image src={multicolor} show={show2} />}
					</div>
				</div>
			</div>

			<div className="bgwhite">
				<div className="row v-stack">
					<div className="support-text" style={{ paddingBottom: 10 }}>
						Mint a BlobStar now to show your support for good people doing good
						things!
					</div>
					<div className="support-text">Currently live on Goerli testnet.</div>
					<MintButton
						web3={web3}
						Contract={Contract}
						setTxHash={setTxHash}
						setTxStatus={setTxStatus}
					/>
					{/* <Timeline isMobile={isMobile} /> */}
				</div>
			</div>

			<div>
				<About />
			</div>

			<ContentModal
				modalOpen={modalOpen}
				txHash={txHash}
				txStatus={txStatus}
				setTxStatus={setTxStatus}
				setModalOpen={setModalOpen}
				isMobile={isMobile}
			/>
		</div>
	);
}
