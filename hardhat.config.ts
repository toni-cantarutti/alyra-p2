import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { INFURA_API_KEY = "", PRIVATE_KEY = "", ETHERSCAN_API_KEY = "" } = process.env;

const ENABLE_FORKING = false;

const config: HardhatUserConfig = {
   networks: {
      localhost: {
         url: "http://localhost:8545",
         chainId: 31337,
      },
      ...(PRIVATE_KEY.length > 0 && INFURA_API_KEY.length > 0
         ? {
              // Use a ternary operator for conditional spreading
              holesky: {
                 url: "https://holesky.infura.io/v3/" + INFURA_API_KEY,
                 chainId: 17000,
                 accounts: [`0x${PRIVATE_KEY}`],
              },
           }
         : {}), // Provide an empty object instead
      ...(ENABLE_FORKING
         ? {
              // Use a ternary operator for conditional spreading
              hardhat: {
                 forking: {
                    url: "https://mainnet.infura.io/v3/" + INFURA_API_KEY,
                 },
              },
           }
         : {}), // Provide an empty object instead
   },
   solidity: "0.8.28",
   etherscan: {
      apiKey: {
         holesky: ETHERSCAN_API_KEY,
      },
   },
   sourcify: {
      enabled: true,
   },
};

export default config;
