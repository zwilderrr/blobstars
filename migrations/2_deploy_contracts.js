const BlobStars = artifacts.require("BlobStars");

const baseUrl_dev = "https://rockstars-nft.s3.us-east-2.amazonaws.com/";
const baseUrl_prod = "https://rockstars-nft.s3.us-east-2.amazonaws.com/";

module.exports = async function (deployer, network) {
	// dev
	deployer.deploy(BlobStars, "BlobStars_dev", "BLOB_dev", baseUrl_dev);
	// prod
	// deployer.deploy(BlobStars, "BlobStars", "BLOB", baseUrl_prod);
};
