const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const Greeting = await hre.ethers.getContractFactory("NFT");
  const greeting = await Greeting.deploy("Imran Khan", "IK");

  await greeting.deployed();
  console.log('NFT Contract Deployed', greeting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
