const BlobStars_dev = artifacts.require("BlobStars_dev");
const truffleAssert = require("truffle-assertions");

contract("BlobStars_dev", function (accounts) {
	let instance;
	let owner;

	before("setup the contract instance and owner", async () => {
		instance = await BlobStars_dev.deployed();
		owner = await instance.owner();
	});

	it("should mint 10 to the owner", async () => {
		const walletOfOwner = await instance.walletOfOwner(owner);
		assert.equal(walletOfOwner.length, 10);
	});

	it("should successfully mint up to 10 at a time", async () => {
		// i = 2 so we skip the owners account
		for (let i = 2; i <= 10; i++) {
			const from = accounts[i - 1];
			await instance.mint(from, i);
			const walletOfOwner = await instance.walletOfOwner(from);
			assert.equal(walletOfOwner.length, i);
		}
	});

	it("should not permit minting more than 10 at a time", async () => {
		await truffleAssert.reverts(
			instance.mint(accounts[1], 11),
			"revert",
			"Can't mint more than 10"
		);
	});

	it("should increase total supply by amount minted", async () => {
		for (let i = 1; i <= 10; i++) {
			let supply = await instance.totalSupply();
			supply = bigToNum(supply);
			await instance.mint(accounts[i], i);

			let newSupply = await instance.totalSupply();
			newSupply = bigToNum(newSupply);

			assert.equal(supply + i, newSupply);
		}
	});

	it("should not mint if contract is paused", async () => {
		const from = accounts[2];

		await instance.mint(from, 1);

		await instance.togglePause(true);

		await truffleAssert.reverts(instance.mint(owner, 1), "revert");

		await instance.togglePause(false);

		await instance.mint(owner, 1);
	});

	it("should accept and be able to remove an array of allowlisted accounts", async () => {
		const [a3, a4, a5] = [accounts[3], accounts[4], accounts[5]];
		// should fail because a3 isn't sending any ether with the request
		await truffleAssert.reverts(instance.mint(a3, 1, { from: a3 }), "revert");

		const allowlist = [a3, a4];
		await instance.allowlistUser(allowlist);
		await instance.mint(a3, 1, { from: a3 });

		await instance.removeAllowlistUser([a4, a5]);
		await truffleAssert.reverts(instance.mint(a4, 1, { from: a4 }), "revert");
		await truffleAssert.reverts(instance.mint(a5, 1, { from: a5 }), "revert");
		await instance.mint(owner, 1);
	});

	it("should not require payment from allowlisted accounts", async () => {
		const a5 = accounts[5];
		await truffleAssert.reverts(instance.mint(a5, 1, { from: a5 }), "revert");
		await instance.allowlistUser([a5]);
		instance.mint(a5, 1, { from: a5 });
	});

	it("should remove an allowlisted account after minting to it", async () => {
		await truffleAssert.reverts(
			instance.mint(accounts[5], 1, { from: accounts[5] }),
			"revert"
		);
		const allowlist = [accounts[5]];
		await instance.allowlistUser(allowlist);
		await instance.mint(accounts[5], 1, { from: accounts[5] });

		await truffleAssert.reverts(
			instance.mint(accounts[5], 1, { from: accounts[5] }),
			"revert"
		);
	});
});

describe("Test web3", function () {
	let instance;
	let owner;
	let accounts;
	let Contract;

	before("setup the contract instance and owner", async () => {
		instance = await BlobStars_dev.deployed();
		owner = await instance.owner();
		accounts = await web3.eth.getAccounts();
		Contract = new web3.eth.Contract(BlobStars_dev._json.abi, instance.address);
	});

	it("should successfully mint up to 10 at a time", async () => {
		const cost = await Contract.methods.cost().call();
		// i = 2 so we skip the owner's account
		for (let i = 2; i <= 10; i++) {
			const from = accounts[i - 1];
			const value = cost * i;
			let beforeMint = await instance.walletOfOwner(from);
			await Contract.methods.mint(from, i).send({
				from,
				value,
				// max gas per block
				gas: web3.utils.hexToNumber(0x6691b7).toString(),
			});
			const afterMint = await instance.walletOfOwner(from);
			assert.equal(afterMint.length, beforeMint.length + i);
		}
	});

	it("should not permit minting more than 10 at a time", async () => {
		const cost = await Contract.methods.cost().call();
		const from = accounts[2];
		const value = cost * 11;
		await truffleAssert.reverts(
			Contract.methods.mint(from, 11).send({ from, value, gas: 1000000 }),
			"revert",
			"Can't mint more than 10"
		);
	});

	it("should require correct payment", async () => {
		const from = accounts[2];
		const value = web3.utils.toWei("1");

		await instance.setCost(web3.utils.toWei("2"));

		await truffleAssert.reverts(
			Contract.methods.mint(from, 1).send({ from, value, gas: 1000000 }),
			"revert",
			"Not enough Eth sent"
		);
	});

	it("should only allow owner to withdraw", async () => {
		const ownerBalanceBeforeWithdraw = await web3.eth.getBalance(owner);
		const contractBalanceBeforeWithdraw = await web3.eth.getBalance(
			instance.address
		);

		assert.notEqual(contractBalanceBeforeWithdraw, "0");

		await truffleAssert.reverts(
			Contract.methods.withdraw().send({ from: accounts[1] })
		);

		await Contract.methods.withdraw().send({ from: owner });

		const contractBalanceAfterWithdraw = await web3.eth.getBalance(
			instance.address
		);

		assert.notEqual(
			contractBalanceBeforeWithdraw,
			contractBalanceAfterWithdraw
		);

		assert.equal(contractBalanceAfterWithdraw, "0");
		const ownerBalanceAfterWithdraw = await web3.eth.getBalance(owner);

		assert.notEqual(ownerBalanceBeforeWithdraw, ownerBalanceAfterWithdraw);
	});
});

function bigToNum(n) {
	return Number(BigInt(n));
}

function toEth(n) {
	return web3.utils.fromWei(n);
}
