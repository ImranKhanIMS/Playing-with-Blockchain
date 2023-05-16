const { expect } = require("chai");

describe("Greeting", function () {
  describe("Deployment", function () {

    it("Age must be 18 at beggining", async function () {
      const Greeting = await hre.ethers.getContractFactory("Greeting");
      const greeting = await Greeting.deploy();

      const age = await greeting.age();
      expect(await age).to.equal(18);
    });
  });
});
