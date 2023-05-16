const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const Greeting = await hre.ethers.getContractFactory("Greeting");
  const greeting = await Greeting.deploy();

  await greeting.deployed();
  console.log('Greeting Contract Deployed', greeting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
