import { createContext, useContext } from 'react'
import {
  useSigningCosmWasmClient,
} from '../hooks/cosmwasm'

let CosmWasmContext;

let {Provider} = (CosmWasmContext = createContext({
    walletAddress: '',
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

    executeFlip:(level) => {},
    executeRemoveTreasury:(level) => {},

    getHistory:() => {},
    historyList: null,

  }))

export const useSigningClient = () =>
  useContext(CosmWasmContext)

export const SigningCosmWasmProvider = ({
  children,
}) => {
  const value = useSigningCosmWasmClient()
  return <Provider value={value}>{children}</Provider>
}
