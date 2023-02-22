const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
	/**
	 * Networks define how you connect to your ethereum client and let you set the
	 * defaults web3 uses to send transactions. If you don't specify one truffle
	 * will spin up a development blockchain for you on port 9545 when you
	 * run `develop` or `test`. You can ask a truffle command to use a specific
	 * network from the command line, e.g
	 *
	 * $ truffle test --network <network-name>
	 */

	networks: {
		// matic: {
		// 	provider: () =>
		// 		new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
		// 	network_id: 80001,
		// 	confirmations: 2,
		// 	timeoutBlocks: 200,
		// 	skipDryRun: true,
		// },
		// Useful for testing. The `development` name is special - truffle uses it by default
		// if it's defined here and no other network is specified at the command line.
		// You should run a client (like ganache, geth, or parity) in a separate terminal
		// tab if you use this network and you must also set the `host`, `port` and `network_id`
		// options below to some value.
		//
		develop: {
			host: "127.0.0.1", // Localhost (default: none)
			port: 8545, // Standard Ethereum port (default: none)
			network_id: "*", // Any network (default: none)
			total_accounts: 11,
		},

		baseGoerli: {
			provider: () =>
				new HDWalletProvider(
					mnemonic,
					"https://eth-goerli.g.alchemy.com/v2/tDgk-BBsMt6IuBHWVZKDka2it_52oTuf"
				),
			network_id: 5, // Goerli's id
			chain_id: 84531,
		},

		goerli: {
			provider: () =>
				new HDWalletProvider(
					mnemonic,
					"https://eth-goerli.g.alchemy.com/v2/tDgk-BBsMt6IuBHWVZKDka2it_52oTuf"
				),
			network_id: 5, // Goerli's id
			chain_id: 5,
		},
	},

	// Set default mocha options here, use special reporters etc.
	mocha: {
		// timeout: 100000
	},
	contracts_build_directory: "./src/contracts",

	// Configure your compilers
	compilers: {
		solc: {
			version: "0.8.13", // Fetch exact version from solc-bin
		},
	},
};
