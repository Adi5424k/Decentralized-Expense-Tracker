const hre = require("hardhat");

async function main() {
  const ExpenseTracker = await hre.ethers.getContractFactory("ExpenseTracker");
  const expenseTracker = await ExpenseTracker.deploy();

  // Wait for the deployment transaction to be mined
  await expenseTracker.waitForDeployment();

  // Get the deployed contract address
  const address = await expenseTracker.getAddress();
  console.log("ExpenseTracker deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 