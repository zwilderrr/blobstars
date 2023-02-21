import "./ContentModal.css";

import { Box, Fade, Modal } from "@mui/material";

import React from "react";
import { tweet } from "../content";

const openSeaUrlDev = "https://testnets.opensea.io/collection/blobstars-dev-2";

const goerliScan = "https://goerli.etherscan.io/tx/";

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
		bgcolor: "ghostwhite",
		boxShadow: 24,
		p: 4,
		borderRadius: 2,
		fontWeight: "bold",
		border: "solid thick rgb(255, 161, 213)",
	};

	const content = {
		complete: (
			<>
				<h1 className="modal-header">Success!</h1>
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
					your new BlobStar status on Twitter
				</div>
				<br />
				<div>
					View your transaction on{" "}
					<a
						href={goerliScan + txHash}
						className="external-link"
						alt="mint mumbai"
						target="_blank"
						rel="noreferrer"
					>
						Goerli scan
					</a>{" "}
					and head over to{" "}
					<a
						href={openSeaUrlDev}
						className="external-link"
						alt="opensea"
						target="_blank"
						rel="noreferrer"
					>
						OpenSea
					</a>{" "}
					to check out your BlobStar (may take a few minutes to display)
				</div>
			</>
		),
		awaitingSignature: (
			<>
				<h1 className="modal-header">Sending</h1>
				<div>Waiting for your signature.</div>
			</>
		),
		sent: (
			<>
				<h1 className="modal-header">Sent</h1>
				<div>Your transaction has been sent to the network.</div>
			</>
		),
		minting: (
			<>
				<h1 className="modal-header">Minting</h1>
				<div>Your BlobStar is minting! Get pumped!</div>
			</>
		),
		error: (
			<>
				<h1 className="modal-header">Error</h1>
				<div>
					There was an error minting your BlobStar. You've been refunded all ETH
					sent (minus gas fees).
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
