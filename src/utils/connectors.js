import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import {
  INFURA_MAINNET_URL,
  INFURA_ROPSTEN_URL,
  INFURA_RINKEBY_URL,
  ALCHEMY_POLYGON_MAINNET_URL,
  ALCHEMY_POLYGON_MUMBAI_URL,
} from "./constants";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 137, 80001],
});

const ALL_SUPPORTED_CHAIN_IDS = [1, 3, 4, 137, 80001];

export const RPC_NETWORK_URLS = {
  1: INFURA_MAINNET_URL,
  3: INFURA_ROPSTEN_URL,
  4: INFURA_RINKEBY_URL,
  137: ALCHEMY_POLYGON_MAINNET_URL,
  80001: ALCHEMY_POLYGON_MUMBAI_URL,
};

const walletConnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: RPC_NETWORK_URLS,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const connectors = { injected, walletConnect };
