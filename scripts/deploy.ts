import { ethers } from "hardhat";

async function main() {


// Assuming 'amount' is the number you want to pass as a BigNumber
  const amount = 1; 
  
  const marsAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const plutoAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const lawswap = await ethers.deployContract("LAWswap", [marsAddress, plutoAddress, amount]);


  await lawswap.waitForDeployment();

  console.log(
    `LAWswap deployed to ${lawswap.target}`
  );
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
