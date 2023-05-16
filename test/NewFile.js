const { expect } = require("chai");

describe("NewFile Testing", function () {
    beforeEach(async() => {
        const NewFile = await hre.ethers.getContractFactory("NewFile");
        newFile = await NewFile.deploy();
      });
  
      // checking age var value
      it("num value testing", async function () {
        const num = await newFile.num();
        expect(num).to.equal(10);
      });
});