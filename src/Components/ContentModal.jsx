import "./ContentModal.css";

import { Box, CircularProgress, Fade, Modal } from "@mui/material";

import React from "react";
import { tweet } from "../content";

const openSeaUrl = "https://opensea.io/collection/blobstarsnft";
const openSeaViewBlobStar =
	"https://opensea.io/assets/base/0x09ce1abaf8a4250337d26982805aa6527c4e9540/";
const blockscoutInventory =
	"https://base.blockscout.com/token/0x09Ce1ABaf8A4250337d26982805aA6527c4e9540?tab=inventory";

const baseBlockScout = "https://base.blockscout.com/tx/";

export const baseChainIdHex = `0x${Number(8453).toString(16)}`;

export function ContentModal({
	txHash,
	txStatus,
	modalOpen,
	setModalOpen,
	setTxStatus,
	setMintedId,
	mintedId,
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
						chainName: "Base",
						nativeCurrency: {
							name: "Ethereum",
							symbol: "ETH",
							decimals: 18,
						},
						rpcUrls: ["https://developer-access-mainnet.base.org/"],
						blockExplorerUrls: ["https://base.blockscout.com/"],
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
					Share your new BlobStar on{" "}
					<a
						href={tweet + mintedId}
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
				<h1 className="heading">Uh oh!</h1>
				<div>Please try again.</div>
			</>
		),
		switchNetwork: (
			<>
				<h1 className="heading">Switch networks</h1>
				<div>You're not connected to Base.</div>
				<div style={{ display: "flex" }}>
					<button className="switch-btn" onClick={changeNetwork}>
						Switch to Base
					</button>
				</div>
			</>
		),
	};

	function closeModal(_, reason) {
		if (!reason || reason === "escapeKeyDown") {
			setModalOpen(false);
			setTxStatus("");
			setMintedId();
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
