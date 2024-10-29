import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import hre from "hardhat";
import { bigint } from "hardhat/internal/core/params/argumentTypes";

const contractName = "Voting";

describe(contractName, function () {
   async function deployFixture() {
      const [owner, addr1, addr2] = await hre.ethers.getSigners();
      const contract = await hre.ethers.deployContract(contractName);
      return { contract, owner, addr1, addr2 };
   }

   describe("Deployment", function () {
      it("Deployed and test owner", async function () {
         const { contract, owner } = await loadFixture(deployFixture);
         assert(owner.address === (await contract.owner()));
      });
   });

   describe("Global (minimal😅) testing ", function () {
      it("1.Test a simple revert: Only voter can add proposals ", async function () {
         const { contract, addr1 } = await loadFixture(deployFixture);

         await expect(contract.addProposal("prop1")).to.be.revertedWith("You're not a voter");
      });

      it("2.Test a custom error: Only owner can add voters ", async function () {
         const { contract, addr1 } = await loadFixture(deployFixture);

         await expect(contract.connect(addr1).addVoter(addr1))
            .to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
            .withArgs(addr1.address);
      });

      it("3.Test an emit: Owner add a voter → emit event ", async function () {
         const { contract, addr1 } = await loadFixture(deployFixture);
         await expect(contract.addVoter(addr1))
            .to.emit(contract, "VoterRegistered")
            .withArgs(addr1.address);
      });

      it("4.Test a storage variable assign", async function () {
         const { contract, owner } = await loadFixture(deployFixture);
         await contract.addVoter(owner);
         assert((await contract.getVoter(owner)).isRegistered === true);
      });
   });
});
