import "./MintButton.css";

import React, { useState } from "react";

export function MintButton({
	Contract,
	web3,
	setTxHash,
	setTxStatus,
	setModalOpen,
}) {
	const MAX_COUNT = 10;
	const [canMint, setCanMint] = useState(true);
	const [count, setCount] = useState(1);

	function handleChangeCount(step) {
		const nextCount = count + step;
		if (nextCount > MAX_COUNT || nextCount < 1) {
			return;
		}
		setCount(nextCount);
	}

	async function onMint() {
		try {
			const [from] = await web3.eth.requestAccounts();
			const id = await web3.eth.net.getId();
			if (id !== 8453) {
				setModalOpen(true);
				setTxStatus("switchNetwork");
				return;
			}
			const cost = await Contract.methods.cost().call();
			const value = cost * count;

			Contract.methods
				.mint(from, count)
				.send({
					from,
					value,
				})
				.once("sending", res => {
					setCanMint(false);
					setTxStatus("awaitingSignature");
					console.log("sending", res);
				})
				.once("sent", res => {
					setTxStatus("sent");
					console.log("sent", res);
				})
				.once("transactionHash", res => {
					console.log("transactionHash", res);
					setTxStatus("minting");
				})
				.once("receipt", res => {
					console.log("receipt", res);
				})
				.on("confirmation", res => console.log("confirmation", res))
				.on("error", res => {
					setCanMint(true);
					setTxStatus("error");
					console.log("error", res);
				})
				.then(res => {
					setCanMint(true);
					setTxStatus("complete");
					setTxHash(res.transactionHash);
				});
		} catch (e) {
			console.log("catch", e);
		}
	}

	const disableButtons = !web3 || !canMint;

	return (
		<div className="mint-btn-wrapper">
			<button className="mint-btn" onClick={onMint} disabled={disableButtons}>
				Mint {count}
			</button>
			<div className="count-btn-wrapper">
				<button
					className="count-btn"
					disabled={disableButtons || count === MAX_COUNT}
					onClick={() => handleChangeCount(1)}
				>
					{"▲"}
				</button>
				<button
					className="count-btn"
					disabled={disableButtons || count === 1}
					onClick={() => handleChangeCount(-1)}
				>
					{"▼"}
				</button>
			</div>
		</div>
	);
}
