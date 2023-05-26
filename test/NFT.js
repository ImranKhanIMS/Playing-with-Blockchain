const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("NFT Testing", function () {
    beforeEach(async() => {
      [deployer, owner1] = await ethers.getSigners();

        const NFT = await hre.ethers.getContractFactory("NFT");
        nft = await NFT.deploy("Imran Khan", "IKJ");
      });

      // checking ERC721 name var value
      it("Name = Imran Khan", async function () {
        const name = await nft.name();
        expect(name).to.equal("Imran Khan");
      });

      // checking ERC721 name var value
      it("List and get a domain", async function () {
        await nft.listDomain('imran.eth', tokens(5));
        const get = await nft.getDomain(1);

        expect(get.name).to.equal('imran.eth');
        expect(get.cost).to.equal(tokens(5));
        expect(get.isOwned).to.equal(false);
      });

      // checking ERC721 name var value
      it("Minting a domain", async function () {
        await nft.listDomain('imran.eth', tokens(5));

        const ID = 1
        const AMOUNT = tokens(5)

        await nft.connect(owner1).mint(ID, {value: AMOUNT});
        const totalSupply = await nft.totalSupply();

        expect(totalSupply).to.equal(1);
      });
});