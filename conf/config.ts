import { ChainId, Config } from '@usedapp/core';
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

let chains : ChainId[];
chains = [ChainId.Mainnet, ChainId.Rinkeby];

export const allowedChains: ChainId[] = chains;

export const getDappConfig = (chainId: number): Config => ({
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: "https://eth-mainnet.alchemyapi.io/v2/" + ALCHEMY_KEY,
    [ChainId.Rinkeby]: "https://eth-rinkeby.alchemyapi.io/v2/" + ALCHEMY_KEY,
    [ChainId.Localhost]: 'http://localhost:8545',
  },
  supportedChains: [
    ChainId.Mainnet,
    ChainId.Rinkeby,
    ChainId.Localhost
  ]
});

const contractConfig: Record<number, { ohm?: string, vault?: string }> = {
  [ChainId.Rinkeby]: {
  },
  [ChainId.Mainnet]: {
    ohm: '0x383518188C0C6d7730D91b2c03a03C837814a899',
    vault: '0x31f8cc382c9898b273eff4e0b7626a6987c846e8',
  },
};

export default contractConfig;
