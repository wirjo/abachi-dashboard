import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://eth-mainnet.alchemyapi.io/v2/wEe2zXzklgqS8i3FiZt5NDmoZgWx5ZpE',
  4: 'https://eth-rinkeby.alchemyapi.io/v2/NDo8Q62iJs-hoBi2y6KxyP7kBVIpEShA',
};
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'Grailers.io',
  appLogoUrl:'https://',
  darkMode: false
});