import { BigNumber, utils } from "ethers";

import { DAO } from "../../typechain-types/DAO";
import { DAO__factory } from "../../typechain-types/factories/DAO__factory";
import { getConfig } from "../../utils/networks";
import { task } from "hardhat/config";

task("contractBalance", "Get contract balance", async (args, hre) => {
  const { ethers } = hre;
  const networkName = hre.network.name;
  const { tokenName, tokenAddress, tokenSymbol, tokenDecimals } =
    getConfig(networkName);
  const [owner, addr1, addr2] = await ethers.getSigners();
  const DAO: DAO__factory = await ethers.getContractFactory("DAO");
  const provider = await ethers.provider;
});
