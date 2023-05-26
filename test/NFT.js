const { expect } = require("chai");

describe("NFT Testing", function () {
    beforeEach(async() => {
        const NFT = await hre.ethers.getContractFactory("NFT");
        nft = await NFT.deploy("Imran Khan", "IKJ");
      });
  
      // checking num var value
      it("num = 20", async function () {
        const num = await nft.num();
        expect(num).to.equal(20);
      });

      // checking ERC721 name var value
      it("Name = Imran Khan", async function () {
        const name = await nft.name();
        expect(name).to.equal("Imran Khan");
      });
});