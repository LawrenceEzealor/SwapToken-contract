import { ethers } from "hardhat";

async function main() {


// Assuming 'amount' is the number you want to pass as a BigNumber
  const token = 1000000

    // const MarsToken = await ethers.deployContract("MARS", [token]);
    
    const PlutoToken = await ethers.deployContract("PLUTO",[token]);


  await PlutoToken.waitForDeployment();

  console.log(
    `PLUTO deployed to ${PlutoToken.target}`
  );
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
