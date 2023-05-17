//rps
export const BET_TYPE_ROCK = "rock";
export const BET_TYPE_PAPER = "paper";
export const BET_TYPE_SCISSORS = "scissors";

//coinflip
export const BET_TYPE_HEAD = "head";
export const BET_TYPE_TAIL = "tail";

export const SUPPORTED_TOKEN_INFO = [
  {
    index: 0,
    symbol: "STARS",
    logo: "https://testnet-explorer.publicawesome.dev/logos/stargaze.png",
    betPrices: [0.05, 0.1, 0.25, 0.5, 0.75, 1.0],
  },
];


// # Chain config
export const NEXT_PUBLIC_COINFLIP_CONTRACT="stars1t56q6vq0jaxdx4mxd0g5el6j5xeqg2nsyf6l8fk4wd8vc732u4tqwmv9pl"
export const NEXT_PUBLIC_CHAIN_ID="elgafar-1"
export const NEXT_PUBLIC_CHAIN_NAME="Stargaze Testnet"
export const NEXT_PUBLIC_CHAIN_BECH32_PREFIX="stars"
export const NEXT_PUBLIC_CHAIN_RPC_ENDPOINT="https://rpc.elgafar-1.stargaze-apis.com/"
export const NEXT_PUBLIC_CHAIN_REST_ENDPOINT="https://rest.elgafar-1.stargaze-apis.com/"
export const NEXT_PUBLIC_STAKING_DENOM="ustars"

