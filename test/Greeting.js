const { expect } = require("chai");

describe("Greeting", function () {
  describe("Deployment", function () {
    let greeting;
    
    beforeEach(async() => {
      const Greeting = await hre.ethers.getContractFactory("Greeting");
      greeting = await Greeting.deploy();
    });

    // checking age var value
    it("Age must be 18 at beggining", async function () {
      const age = await greeting.getAge();
      expect(age).to.equal(18);
    });

    // setting new value to the age
    it("Age updated to 20", async function () {
      await greeting.setAge(20);

      const result = await greeting.getAge();
      expect(result).to.equal(20);
    });

    // checking age name value
    it("Name must be Greeting at beggining", async function () {
      const name = await greeting.getName();
      expect(name).to.equal('Greeting');
    });

    // setting new value to the name
    it("Name updated to 'Imran Khan'", async function () {
      await greeting.setName('Imran Khan');

      const result = await greeting.getName();
      expect(result).to.equal('Imran Khan');
    });

    // setting new value to the name and age
    it("Name updated to Blockchain and age to 2050", async function () {
      await greeting.setName('Blockchain');
      await greeting.setAge(2050);

      const name = await greeting.getName();
      const age = await greeting.getAge();
      expect(name).to.equal('Blockchain');
      expect(age).to.equal(2050);
    });

    // checking arr Array value at index 0
    it("arr[0] = 5", async function () {
      const arr = await greeting.arr([0]);
      expect(arr).to.equal(5);
    });


    // checking all values of Data struct
    it("Data struct valus at beggining", async function () {
      const id = await greeting.getStructId();
      const title = await greeting.getStructTitle();
      const count = await greeting.getStructCount();
      const flag = await greeting.getStructFlag();

      expect(id).to.equal(1);
      expect(title).to.equal('test');
      expect(count).to.equal(1);
      expect(flag).to.equal(false);
    });
  });
});
