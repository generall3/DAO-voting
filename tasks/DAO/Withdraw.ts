import { ExcaliburToken } from "../../typechain-types/ExcaliburTokenToken";
import { ExcaliburToken__factory } from "../../typechain-types/factories/ExcaliburToken__factory";
import { Console } from "console";
import { DAO } from "../../typechain-types/DAO";
import { DAO__factory } from "../../typechain-types/factories/DAO__factory";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import Web3 from "web3";
import { ethers } from "ethers";
import { getConfig } from "../../utils/networks";
import { task } from "hardhat/config";

task("withdraw", "Withdraw from DAO to user")
  .addParam("amount", "Token amount")
  .setAction(async (args, hre) => {
    const [owner, addr1] = await hre.ethers.getSigners();
    const networkName = hre.network.name;
    const web3 = new Web3(Web3.givenProvider);
    console.log(`networkName`, networkName);
    const { tokenName, tokenAddress, tokenSymbol, tokenDecimals, daoAddress } =
      getConfig(networkName);

    const Token: ExcaliburToken__factory = await hre.ethers.getContractFactory(
      "CRGToken"
    );
    const token: ExcaliburToken = await Token.attach(tokenAddress);
    const DAO: DAO__factory = await hre.ethers.getContractFactory("DAO");
    const dao: DAO = await DAO.attach(daoAddress);

    await dao.withdraw(hre.ethers.utils.parseUnits(args.amount, tokenDecimals));

    console.log(
      `DAO Balance: `,
      (await token.balanceOf(dao.address)).toString()
    );
    console.log(
      `Token Owner Balance: `,
      (await token.balanceOf(owner.address)).toString()
    );
  });
