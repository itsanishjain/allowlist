import "../styles/globals.css";

import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";

import Layout from "../src/components/Layout";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

const MyApp = ({ Component, pageProps }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Web3ReactProvider>
);

export default MyApp;
