const RockstarsNFT = artifacts.require("RockstarsNFT");

const baseUrlProd = "https://rockstars-nft.s3.us-east-2.amazonaws.com/";

module.exports = async function (deployer, network) {
	deployer.deploy(RockstarsNFT, "RockstarsNFT", "RSNFT", baseUrlProd);
};
