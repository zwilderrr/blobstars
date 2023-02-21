const BlobStars_dev = artifacts.require("BlobStars_dev");

const baseUrl_dev = "https://blobstars-dev.s3.us-east-2.amazonaws.com/";
const baseUrl_prod = "https://blobstars.s3.us-east-2.amazonaws.com/";

module.exports = async function (deployer, network) {
	// dev
	deployer.deploy(BlobStars_dev, "BlobStars_dev", "BLOB_dev", baseUrl_dev);

	// prod
	// deployer.deploy(BlobStars, "BlobStars", "BLOB", baseUrl_prod);
};
