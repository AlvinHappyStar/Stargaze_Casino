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
export const NEXT_PUBLIC_COINFLIP_CONTRACT="stars10w7u2vn5auwxxrwnuz3aa8akpr544uwx883smcqzyqfynp8vvqhstr9nw8"
export const NEXT_PUBLIC_CHAIN_ID="elgafar-1"
export const NEXT_PUBLIC_CHAIN_NAME="Stargaze Testnet"
export const NEXT_PUBLIC_CHAIN_BECH32_PREFIX="stars"
export const NEXT_PUBLIC_CHAIN_RPC_ENDPOINT="https://rpc.elgafar-1.stargaze-apis.com/"
export const NEXT_PUBLIC_CHAIN_REST_ENDPOINT="https://rest.elgafar-1.stargaze-apis.com/"
export const NEXT_PUBLIC_STAKING_DENOM="ustars"

