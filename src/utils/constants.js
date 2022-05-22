// export const ALLOWLIST_CONTRACT = "0xfdb45a71fa1761fb43d2d665a3e1cc4a31b10e4c"; // Rinkeby

export const ALLOWLIST_CONTRACT = "0xBfa680c93e14880af7F4b67ad43e0bF36F9741d6"; // Mumbai

export const INFURA_MAINNET_URL = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
export const INFURA_ROPSTEN_URL = `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
export const INFURA_RINKEBY_URL = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;

export const ALCHEMY_POLYGON_MAINNET_URL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_MAINNET_KEY}`;

export const ALCHEMY_POLYGON_MUMBAI_URL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_MUMBAI_KEY}`;

export const REDIS_URL = process.env.NEXT_PUBLIC_REDIS_URL;
export const REDIS_CACHE_TTL = process.env.NEXT_PUBLIC_REDIS_CACHE_TTL;
