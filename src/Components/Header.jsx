import "./Header.css";

import { useEffect, useState } from "react";

import BlobStarsNFTJSON from "../contracts/BlobStars_dev.json";
import { Link } from "react-router-dom";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { socialMediaLinks } from "../content";

let provider;
let web3;

const GET_COINBASE_WALLET = "Coinbase Wallet";
const CONNECT_WALLET = "Connect Wallet";
export const COINBASE_EXTENSION_URL =
	"https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en";
export const COINBASE_WALLET_URL = "https://www.coinbase.com/wallet/downloads";

const contractAddress = {
	goerli: "0x8465c44BD3ca5dD497FE725E91b788Acc6C3b452",
	local: "0xa93Ae522784Bf2Ae7B13542f9971A2D029d3D93b",
	baseTestnet: "0x96A66C81A56C3BB0fcC1BDFEaa3131e287022E90",
};

export function scrollToTop(top = 0) {
	window.scroll({ top, behavior: "smooth" });
}

export function Header({
	setWeb3,
	setProvider,
	setContract,
	shrink,
	isMobile,
}) {
	const LISTENERS = [
		{ name: "accountsChanged", fn: handleAccountChanged },
		{ name: "chainChanged", fn: handleChainChanged },
	];

	const [connectBtnText, setConnectBtnText] = useState(CONNECT_WALLET);

	async function connectWallet() {
		provider = await detectEthereumProvider({ timeout: 1000 });

		if (!provider) {
			setConnectBtnText(GET_COINBASE_WALLET);
			return;
		}

		addEventListeners(provider);
		web3 = new Web3(provider);
		const [selectedAccount] = await web3.eth.getAccounts();

		setContract(
			new web3.eth.Contract(BlobStarsNFTJSON.abi, contractAddress.baseTestnet)
		);
		setConnectBtnText(formatAccount(selectedAccount) || CONNECT_WALLET);
		setWeb3(web3);
		setProvider(provider);
	}

	useEffect(() => {
		connectWallet();

		return () => {
			removeEventListeners();
		};
	}, []);

	function addEventListeners(provider) {
		LISTENERS.forEach(event => provider.on(event.name, event.fn));
	}

	function removeEventListeners() {
		LISTENERS.forEach(event => provider.removeListener(event.name, event.fn));
	}

	function handleChainChanged(chainId) {
		window.location.reload();
		console.log(chainId);
	}

	function handleAccountChanged(accounts) {
		setConnectBtnText(formatAccount(accounts[0]) || CONNECT_WALLET);
	}

	async function handleOnConnectWalletClick() {
		if (web3) {
			await web3.eth.requestAccounts();
			return;
		}

		if (connectBtnText === GET_COINBASE_WALLET) {
			if (isMobile) {
				window.open(COINBASE_WALLET_URL, "_blank").focus();
				return;
			}
			window.open(COINBASE_EXTENSION_URL, "_blank").focus();
			setConnectBtnText(CONNECT_WALLET);
			return;
		}

		connectWallet();
	}

	function formatAccount(account) {
		if (!account) {
			return;
		}

		return account.slice(0, 6) + "..." + account.slice(-6);
	}

	return (
		<div className={`header ${shrink ? "shadow" : ""}`}>
			<span
				onClick={() => window.scrollTo({ behavior: "smooth", top: 0, left: 0 })}
			>
				<div className="logo-text">B</div>
			</span>

			<div className="links-wrapper">
				<div className="links">
					{socialMediaLinks.map(link => (
						<a
							key={link.name}
							className="link"
							href={link.href}
							target="_blank"
							rel="noreferrer"
						>
							{link.component}
						</a>
					))}
				</div>

				<button className="connect-btn" onClick={handleOnConnectWalletClick}>
					{connectBtnText}
				</button>
			</div>
		</div>
	);
}
