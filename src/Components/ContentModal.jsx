import React from "react";
import { Box, Modal, Fade } from "@mui/material";
import { tweet } from "../content";
import "./ContentModal.css";

const openSeaUrlDev = "https://testnets.opensea.io/account/rockstarsnftdev-v2";
// const openSeaUrlDev =
// 	"https://testnets.opensea.io/account/rockstars-nft-hotness-dev";
const openSeaUrlProd = "https://opensea.io/account/rockstars-nft-hotness";

const etherscanRinkeby = "https://rinkeby.etherscan.io/tx/";

export function ContentModal({
	txHash,
	txError,
	setTxError,
	modalOpen,
	setModalOpen,
}) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: window.screen.width < 480 ? "70%" : 500,
		bgcolor: "ghostwhite",
		boxShadow: 24,
		p: 4,
		borderRadius: 2,
		fontWeight: "bold",
		border: "solid thick rgb(255, 161, 213)",
	};

	const content = {
		success: (
			<>
				<h1 className="modal-header"> Success!</h1>
				<div>
					<a
						href={tweet}
						className="external-link"
						alt="twitter"
						target="_blank"
						rel="noreferrer"
					>
						Share
					</a>{" "}
					your new Rockstar status on Twitter
				</div>
				<br />
				<div>
					View your transaction on{" "}
					<a
						href={etherscanRinkeby + txHash}
						className="external-link"
						alt="mint rinkeby"
						target="_blank"
						rel="noreferrer"
					>
						Etherscan
					</a>{" "}
					and head over to{" "}
					<a
						href={openSeaUrlDev}
						className="external-link"
						alt="mint rinkeby"
						target="_blank"
						rel="noreferrer"
					>
						OpenSea
					</a>{" "}
					to check out your Rockstar (may take a few minutes to display)
				</div>
			</>
		),
		error: (
			<>
				<h1 className="modal-header">Error</h1>
				<div>
					There was an error minting your Rockstar. You've been refunded all ETH
					sent (minus gas fees).
				</div>
			</>
		),
	};

	const txStatus = txError ? "error" : txHash ? "success" : "";

	function closeModal(_, reason) {
		if (!reason || reason === "escapeKeyDown") {
			setModalOpen(false);
			setTxError(false);
		}
	}

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
				</Box>
			</Fade>
		</Modal>
	);
}
