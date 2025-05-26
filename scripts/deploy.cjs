const hardhat = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const { ethers } = hardhat;
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const ArtistVerification = await ethers.getContractFactory("ArtistVerification");
  const artistVerification = await ArtistVerification.deploy();
  await artistVerification.waitForDeployment();

  const address = await artistVerification.getAddress();
  console.log("ArtistVerification deployed to:", address);

  // Save contract address and ABI
  const data = {
    address,
    abi: JSON.parse(artistVerification.interface.formatJson())
  };

  fs.writeFileSync(
    path.join( "contracts", "ArtistVerification.json"),
    JSON.stringify(data, null, 2)
  );

  fs.writeFileSync(
    path.join("contracts", "ArtistVerification.json"),
    JSON.stringify(data, null, 2)
  );

  // Save deployment account
  const deploymentData = {
    address_s: deployer.address,
    privateKey: deployer.privateKey
  };

  fs.writeFileSync(
    path.join("backend", ".env"),
    `WEB3_STORAGE_TOKEN=9e002a18.ae363fd6ab514b78875d91eb3de8c33b
PRIVATE_KEY=${deploymentData.privateKey}
RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=${deploymentData.address_s}
PORT=3000`
  );

  fs.writeFileSync(
    ".env",
    `VITE_API_URL=http://localhost:3000/api
VITE_CONTRACT_ADDRESS=${deploymentData.address_s}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
