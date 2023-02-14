import "./MintButton.css";

import React, { useState } from "react";

const metamaskProviderErrorCodes = [4001, 4100, 4200, 4900, 4901];

export function MintButton({ Contract, web3, setTxHash, setTxError }) {
	const MAX_COUNT = 5;
	const [btnText, setBtnText] = useState();
	const [minting, setMinting] = useState(false);
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
			if (id !== 80001) {
				window.alert(
					"Mint failed!\n\nNot connected to Mumbai\n\nPlease switch to Mumbai and try again"
				);
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
					console.log("sending", res);
				})
				.once("sent", res => console.log("sent", res))
				.once("transactionHash", res => {
					console.log("transactionHash", res);
					setMinting(true);
					setBtnText("Minting! Get pumped");
				})
				.once("receipt", res => console.log("receipt", res))
				.on("confirmation", res => console.log("confirmation", res))
				.on("error", res => {
					setMinting(false);
					setCanMint(true);
					if (!metamaskProviderErrorCodes.includes(res.code)) {
						setTxError(true);
					}
					console.log("error", res);
				})
				.then(res => {
					setBtnText("");
					setMinting(false);
					setCanMint(true);
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
				{minting ? btnText : `Mint ${count} BlobStar${count > 1 ? "s" : ""}`}
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
