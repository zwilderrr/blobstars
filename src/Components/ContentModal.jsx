import "./ContentModal.css";

import { Box, CircularProgress, Fade, Modal } from "@mui/material";

import React from "react";
import { tweet } from "../content";

const openSeaUrlDev = "https://testnets.opensea.io/collection/blobstars-dev-2";
const blockscoutTestnetInventory =
	"https://base-goerli.blockscout.com/token/0x24Fc73d294Ff3b9beC76e875213d855d26Dd5290?tab=inventory";

const baseTestnetBlockScout = "https://base-goerli.blockscout.com/tx/";

export const baseChainIdHex = `0x${Number(84531).toString(16)}`;

export function ContentModal({
	txHash,
	txStatus,
	modalOpen,
	setModalOpen,
	setTxStatus,
}) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: window.screen.width < 480 ? "70%" : 500,
		bgcolor: "#faf9f6",
		boxShadow: 24,
		p: 4,
		borderRadius: 2,
		fontWeight: "bold",
		border: "solid thick rgb(255, 161, 213)",
	};

	const loadingStyle = {
		display: "flex",
		justifyContent: "center",
		paddingTop: 40,
		paddingBottom: 20,
	};

	const changeNetwork = async ({ networkName }) => {
		if (!window.ethereum) throw new Error("No crypto wallet found");

		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: baseChainIdHex }],
			});
		} catch (e) {
			await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [
					{
						chainId: baseChainIdHex,
						chainName: "Base Testnet",
						nativeCurrency: {
							name: "Ethereum",
							symbol: "ETH",
							decimals: 18,
						},
						rpcUrls: ["https://goerli.base.org/"],
						blockExplorerUrls: ["https://base-goerli.blockscout.com/"],
					},
				],
			});
		} finally {
			setModalOpen(false);
			setTxStatus("");
		}
	};

	const content = {
		complete: (
			<>
				<h1 className="heading">Success</h1>
				<div style={{ paddingBottom: 12 }}>
					View your transaction on{" "}
					<a
						href={baseTestnetBlockScout + txHash}
						className="external-link"
						alt="blockscout"
						target="_blank"
						rel="noreferrer"
					>
						Blockscout
					</a>{" "}
					and check out the full inventory{" "}
					<a
						href={blockscoutTestnetInventory}
						className="external-link"
						alt="blockscout"
						target="_blank"
						rel="noreferrer"
					>
						here
					</a>
					.
					{/* and head over to{" "}
					<a
						href={openSeaUrlDev}
						className="external-link"
						alt="opensea"
						target="_blank"
						rel="noreferrer"
					>
						OpenSea
					</a>{" "}
					to check out your BlobStar (may take a few minutes to display) */}
				</div>
				<div>
					Share your new BlobStar on{" "}
					<a
						href={tweet}
						className="external-link"
						alt="twitter"
						target="_blank"
						rel="noreferrer"
					>
						Twitter
					</a>
					!
				</div>
			</>
		),
		awaitingSignature: (
			<>
				<h1 className="heading">Confirming</h1>
				<div>Waiting for you to confirm the transaction..</div>
			</>
		),
		sent: (
			<>
				<h1 className="heading">Sent</h1>
				<div>Your transaction has been sent to the network.</div>
			</>
		),
		minting: (
			<>
				<h1 className="heading">Minting</h1>
				<div>Your BlobStar is minting!</div>
			</>
		),
		error: (
			<>
				<h1 className="heading">Error</h1>
				<div>Please try again.</div>
			</>
		),
		switchNetwork: (
			<>
				<h1 className="heading">Switch networks</h1>
				<div>You're not connected to Base Testnet.</div>
				<div style={{ display: "flex" }}>
					<button className="switch-btn" onClick={changeNetwork}>
						Switch to Base Testnet
					</button>
				</div>
			</>
		),
	};

	function closeModal(_, reason) {
		if (!reason || reason === "escapeKeyDown") {
			setModalOpen(false);
			setTxStatus("");
		}
	}

	const showLoading =
		!txHash && txStatus !== "error" && txStatus !== "switchNetwork";

	return (
		<Modal
			open={modalOpen}
			onClose={closeModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Fade in={modalOpen}>
				<Box sx={style}>
					<button className="close-button" onClick={closeModal}>
						x
					</button>
					{content[txStatus]}
					{showLoading && (
						<Box style={loadingStyle}>
							<CircularProgress />
						</Box>
					)}
				</Box>
			</Fade>
		</Modal>
	);
}
