import { createContext, useContext } from 'react'
import {
  useSigningCosmWasmClient,
} from '../hooks/cosmwasm'

let CosmWasmContext;

let {Provider} = (CosmWasmContext = createContext({
    walletAddress: localStorage.getItem("address"),
    client: null,
    signingClient: null,
    loading: false,
    error: null,
    connectWallet: (inBackground) => {},
    disconnect: () => {},
    getConfig: () => {},
    config: null,
    isAdmin: false,

    getBalances: () => {},
    nativeBalanceStr: '',
    nativeBalance: 0,

    executeRPS:(level) => {},
    executeFlip:(level) => {},
    executeDice:(level) => {},
    executeRemoveTreasury:(level) => {},

    getRPSHistory:() => {},
    RPShistoryList: null,

    getFlipHistory:() => {},
    FliphistoryList: null,

    getDiceHistory:() => {},
    DicehistoryList: null,

  }))

export const useSigningClient = () =>
  useContext(CosmWasmContext)

export const SigningCosmWasmProvider = ({
  children,
}) => {
  const value = useSigningCosmWasmClient()
  return <Provider value={value}>{children}</Provider>
}
