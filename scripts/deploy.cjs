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
    address: deployer.address,
    privateKey: deployer.privateKey
  };

  fs.writeFileSync(
    path.join("backend", ".env"),
    `WEB3_STORAGE_TOKEN=your_web3_storage_token
PRIVATE_KEY=${deployer.privateKey}
RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=${address}
PORT=3000`
  );

  fs.writeFileSync(
    ".env",
    `VITE_API_URL=http://localhost:3000/api
VITE_CONTRACT_ADDRESS=${address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
