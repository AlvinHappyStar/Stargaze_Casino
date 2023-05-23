//rps
export const BET_TYPE_ROCK = "rock";
export const BET_TYPE_PAPER = "paper";
export const BET_TYPE_SCISSORS = "scissors";

//coinflip
export const BET_TYPE_HEAD = "head";
export const BET_TYPE_TAIL = "tail";

//dice
export const BET_TYPE_ODD = "odd";
export const BET_TYPE_EVEN = "even";

export const SUPPORTED_TOKEN_INFO = [
  {
    index: 0,
    symbol: "STARS",
    logo: "https://testnet-explorer.publicawesome.dev/logos/stargaze.png",
    betPrices: [0.05, 0.1, 0.25, 0.5, 0.75, 1.0],
  },
];

// # Chain config
export const NEXT_PUBLIC_COINFLIP_CONTRACT="stars14hdk7xjywj95qpjxxaxhn0hdfhz4n3l7hl6ur4cmm7ch6dfncz3sfa297t"
export const NEXT_PUBLIC_CHAIN_ID="elgafar-1"
export const NEXT_PUBLIC_CHAIN_NAME="Stargaze Testnet"
export const NEXT_PUBLIC_CHAIN_BECH32_PREFIX="stars"
export const NEXT_PUBLIC_CHAIN_RPC_ENDPOINT="https://rpc.elgafar-1.stargaze-apis.com/"
export const NEXT_PUBLIC_CHAIN_REST_ENDPOINT="https://rest.elgafar-1.stargaze-apis.com/"
export const NEXT_PUBLIC_STAKING_DENOM="ustars"

export const chainConfig = {
  // Chain-id of the Cosmos SDK chain.
  chainId: NEXT_PUBLIC_CHAIN_ID,
  // The name of the chain to be displayed to the user.
  chainName: NEXT_PUBLIC_CHAIN_NAME,
  // RPC endpoint of the chain.
  rpc: NEXT_PUBLIC_CHAIN_RPC_ENDPOINT,
  // REST endpoint of the chain.
  rest: NEXT_PUBLIC_CHAIN_REST_ENDPOINT,
  // Staking coin information
  stakeCurrency: {
    // Coin denomination to be displayed to the user.
    coinDenom: "STARS",
    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
    coinMinimalDenom: NEXT_PUBLIC_STAKING_DENOM,
    // # of decimal points to convert minimal denomination to user-facing denomination.
    coinDecimals: 6,
    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
    coinGeckoId: "stars",
    coinImageUrl: 'https://stargaze.zone/logo.png',
    
  },
  // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
  // The 'stake' button in Keplr extension will link to the webpage.
  // walletUrlForStaking: "",
  // The BIP44 path.
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 118,
  },
  // Bech32 configuration to show the address to user.
  bech32Config: {
    bech32PrefixAccAddr: NEXT_PUBLIC_CHAIN_BECH32_PREFIX,
    bech32PrefixAccPub: `${NEXT_PUBLIC_CHAIN_BECH32_PREFIX}pub`,
    bech32PrefixValAddr: `${NEXT_PUBLIC_CHAIN_BECH32_PREFIX}valoper`,
    bech32PrefixValPub: `${NEXT_PUBLIC_CHAIN_BECH32_PREFIX}valoperpub`,
    bech32PrefixConsAddr: `${NEXT_PUBLIC_CHAIN_BECH32_PREFIX}valcons`,
    bech32PrefixConsPub: `${NEXT_PUBLIC_CHAIN_BECH32_PREFIX}valconspub`,
  },
  // List of all coin/tokens used in this chain.
  currencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: 'STARS',
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: NEXT_PUBLIC_STAKING_DENOM,
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      coinGeckoId: "stars",
    coinImageUrl: 'https://stargaze.zone/logo.png',
    },
  ],
  // (Optional) This is used to set the fee of the transaction.
  // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
  // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
  // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
  gasPriceStep: {
    low: 0.0,
    average: 0.0,
    high: 0.025,
  },
  // List of coin/tokens used as a fee token in this chain.
  feeCurrencies: [
    {
      // Coin denomination to be displayed to the user.
      coinDenom: 'STARS',
      // Actual denom (i.e. uatom, uscrt) used by the blockchain.
      coinMinimalDenom: NEXT_PUBLIC_STAKING_DENOM,
      // # of decimal points to convert minimal denomination to user-facing denomination.
      coinDecimals: 6,
      // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      coinGeckoId: "stargaze",
    coinImageUrl: 'https://stargaze.zone/logo.png',
    },
  ],
  // (Optional) The number of the coin type.
  // This field is only used to fetch the address from ENS.
  // Ideally, it is recommended to be the same with BIP44 path's coin type.
  // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
  // So, this is separated to support such chains.
  coinType: 118,
}