import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect,assert } from "chai";
import { ethers } from "hardhat";

describe("SWAP TOKEN test", function () {
  async function deployLAWswap() {
    const [owner, user1] = await ethers.getSigners();

    const PLUTO = await ethers.getContractFactory("PLUTO");
    const pluto = (await PLUTO.deploy(1_000));
    const MARS = await ethers.getContractFactory("MARS");
    const mars = (await MARS.deploy(1_000));

    const LAWswap = await ethers.getContractFactory("LAWswap");
    const lawswap = (await LAWswap.deploy(mars.target, pluto.target, 2));


    return { owner, user1, lawswap, mars, pluto };
  }

  // this.beforeEach(async () => {
  // const { lawswap, mars, pluto } = await loadFixture(deployLAWswap);
    
  //   mars.transfer(lawswap.target, 200);
  //   pluto.transfer(lawswap.target, 200);
  // });

  describe("test deployed", () => {
    it("", async () => {
      const { lawswap, mars, pluto } = await loadFixture(deployLAWswap);
      assert.isNotNull(mars);
      expect(pluto).is.not.empty;
      expect(lawswap).is.not.null;
      expect(mars).is.not.eq(ethers.ZeroAddress);
    })
  });

  describe("test swap", () => {
    it("mars sould be able to swap to pluto", async () => {
      const { owner, lawswap, mars, pluto } = await loadFixture(deployLAWswap);
      mars.transfer(lawswap.target, 200);
    pluto.transfer(lawswap.target, 200);
      console.log(await mars.balanceOf(lawswap.target));
      console.log(await pluto.balanceOf(lawswap.target))
      await mars.approve(lawswap.target, 100);
      
      await lawswap.swapMarsToPluto(50);

      const bal = await pluto.balanceOf(owner.address);

      expect(bal).to.be.eq(900);
    });
  })

  describe("test swap", function () {
    it("pluto should be able to swap to mars", async ()=> {
      const { owner, lawswap, mars, pluto } = await loadFixture(deployLAWswap);
      pluto.transfer(lawswap.target, 200);
      mars.transfer(lawswap.target, 200);
      console.log(await pluto.balanceOf(lawswap.target));
      console.log(await mars.balanceOf(lawswap.target));
      await pluto.approve(lawswap.target, 100);

      await lawswap.swapPlutoToMars(20);

      const bal = await mars.balanceOf(owner.address);

      expect(bal).to.equal(810);
    })
  })

});
