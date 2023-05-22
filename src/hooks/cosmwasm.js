import { useState } from 'react'
import { toast } from "react-toastify";
import { connectKeplr } from '../services/keplr'
import { SigningCosmWasmClient, CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
  convertFromMicroDenom
} from '../util/conversion'

import {
  NEXT_PUBLIC_CHAIN_RPC_ENDPOINT,
  NEXT_PUBLIC_CHAIN_REST_ENDPOINT,
  NEXT_PUBLIC_CHAIN_ID,
  NEXT_PUBLIC_STAKING_DENOM,
  NEXT_PUBLIC_COINFLIP_CONTRACT
} from '../config'
import { NotificationManager } from 'react-notifications'
// import { create } from 'ipfs-http-client'
import { coin } from '@cosmjs/launchpad'

// import { useNotification } from '../components/Notification'

export const PUBLIC_CHAIN_RPC_ENDPOINT = NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
export const PUBLIC_CHAIN_REST_ENDPOINT = NEXT_PUBLIC_CHAIN_REST_ENDPOINT || ''
export const PUBLIC_CHAIN_ID = NEXT_PUBLIC_CHAIN_ID || ''
export const PUBLIC_STAKING_DENOM = NEXT_PUBLIC_STAKING_DENOM || 'ustars'
export const PUBLIC_COINFLIP_CONTRACT = NEXT_PUBLIC_COINFLIP_CONTRACT || ''

export const defaultFee = {
  amount: [],
  gas: "400000",
}

export const useSigningCosmWasmClient = () => {
  const [client, setClient] = useState(null)
  const [signingClient, setSigningClient] = useState(null)

  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const [nativeBalanceStr, setNativeBalanceStr] = useState('')
  const [nativeBalance, setNativeBalance] = useState(0)

  const [config, setConfig] = useState({ owner: '', enabled: true, denom: null, treasury_amount: 0, flip_count: 0 })
  const [RPShistoryList, setRHistoryList] = useState([])
  const [FliphistoryList, setFHistoryList] = useState([])
  const [DicehistoryList, setDHistoryList] = useState([])

  // const { success: successNotification, error: errorNotification } = useNotification()

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    connect & disconnect   //////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const showNotification = false;
  const notify = (flag, str) => {
    if (!showNotification)
      return;

    if (flag)
      NotificationManager.success(str)
    else
      NotificationManager.error(str)
  }
  const connectWallet = async (inBackground) => {
    if (!inBackground)
      setLoading(true)

    try {
      await connectKeplr()

      // enable website to access kepler
      await (window).keplr.enable(PUBLIC_CHAIN_ID)

      // get offline signer for signing txs
      const offlineSigner = await (window).getOfflineSignerOnlyAmino(
        PUBLIC_CHAIN_ID
      )

      // make client
      setClient(
        await CosmWasmClient.connect(PUBLIC_CHAIN_RPC_ENDPOINT)
      )

      // make client
      setSigningClient(
        await SigningCosmWasmClient.connectWithSigner(
          PUBLIC_CHAIN_RPC_ENDPOINT,
          offlineSigner
        )
      )

      // get user address
      const [{ address }] = await offlineSigner.getAccounts()
      setWalletAddress(address)

      localStorage.setItem("address", address)

      if (!inBackground) {
        setLoading(false)
        notify(true, "Connected Successfully")
      }
    } catch (error) {
      notify(false, `Connect error : ${error}`)
      if (!inBackground) {
        setLoading(false)
      }
    }
  }

  const disconnect = () => {
    if (signingClient) {
      localStorage.removeItem("address")
      signingClient.disconnect()

    }
    setIsAdmin(false)
    setWalletAddress('')
    setSigningClient(null)
    setLoading(false)
    notify(true, `Disconnected successfully`)
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    global variables    /////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const getBalances = async () => {
    setLoading(true)
    try {
      const objectNative = await signingClient.getBalance(walletAddress, PUBLIC_STAKING_DENOM)
      setNativeBalanceStr(`${convertMicroDenomToDenom(objectNative.amount)} ${convertFromMicroDenom(objectNative.denom)}`)
      setNativeBalance(convertMicroDenomToDenom(objectNative.amount))
      setLoading(false)
      notify(true, `Successfully got balances`)
    } catch (error) {
      setLoading(false)
      notify(false, `GetBalances error : ${error}`)
    }
  }

  const getConfig = async () => {

    setLoading(true)
    try {
      const response = await signingClient.queryContractSmart(PUBLIC_COINFLIP_CONTRACT, {
        config: {}
      })
      setConfig(response)
      setIsAdmin(response.owner === walletAddress)
      setLoading(false)
      notify(true, `Successfully got config`)
    } catch (error) {
      setLoading(false)
      notify(false, `getConfig error : ${error}`)
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////    Execute Flip and Remove Treasury     ////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const executeRPS = async (level, price) => {
    setLoading(true)
    try {

      const result = await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_COINFLIP_CONTRACT, // token escrow contract
        {
          "rps":
          {
            "level": level,
          }
        },
        defaultFee,
        undefined,
        [coin(parseInt(convertDenomToMicroDenom(price), 10), PUBLIC_STAKING_DENOM)]
      )
      setLoading(false)
      getBalances()
      if (result && result.transactionHash) {

        const response = await signingClient.getTx(result.transactionHash)
        let log_json = JSON.parse(response.rawLog)
        let wasm_events = log_json[0].events[5].attributes

        console.log("==============res============", wasm_events);

        return parseInt(wasm_events[4].value);
        // if (wasm_events[4].value == 'true') 
        //   successNotification({ title: `You Win`, txHash: result.transactionHash })
        // else
        //   errorNotification({ title: `You Lose`, txHash: result.transactionHash })
      }
      else
        return undefined;
    } catch (error) {
      setLoading(false)
      toast.error(`${error}`)
    }
  }

  const executeFlip = async (level, price) => {
    setLoading(true)
    try {

      const result = await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_COINFLIP_CONTRACT, // token escrow contract
        {
          "flip":
          {
            "level": level,
          }
        },
        defaultFee,
        undefined,
        [coin(parseInt(convertDenomToMicroDenom(price), 10), PUBLIC_STAKING_DENOM)]
      )
      setLoading(false)
      getBalances()
      if (result && result.transactionHash) {

        const response = await signingClient.getTx(result.transactionHash)
        let log_json = JSON.parse(response.rawLog)
        let wasm_events = log_json[0].events[5].attributes

        console.log("==============flip_res============", wasm_events);

        return parseInt(wasm_events[4].value);
        // if (wasm_events[4].value == 'true') 
        //   successNotification({ title: `You Win`, txHash: result.transactionHash })
        // else
        //   errorNotification({ title: `You Lose`, txHash: result.transactionHash })
      }
    } catch (error) {
      setLoading(false)
      toast.error(`${error}`)
    }
  }

  const executeDice = async (level, price) => {
    setLoading(true)
    try {

      const result = await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_COINFLIP_CONTRACT, // token escrow contract
        {
          "dice":
          {
            "level": level,
          }
        },
        defaultFee,
        undefined,
        [coin(parseInt(convertDenomToMicroDenom(price), 10), PUBLIC_STAKING_DENOM)]
      )
      setLoading(false)
      getBalances()
      if (result && result.transactionHash) {

        const response = await signingClient.getTx(result.transactionHash)
        let log_json = JSON.parse(response.rawLog)
        let wasm_events = log_json[0].events[5].attributes

        console.log("==============dice_res============", wasm_events);

        return parseInt(wasm_events[4].value);
        // if (wasm_events[4].value == 'true') 
        //   successNotification({ title: `You Win`, txHash: result.transactionHash })
        // else
        //   errorNotification({ title: `You Lose`, txHash: result.transactionHash })
      }
    } catch (error) {
      setLoading(false)
      toast.error(`${error}`)
    }
  }

  const executeRemoveTreasury = async (amount) => {
    setLoading(true)

    try {

      const result = await signingClient.execute(
        walletAddress, // sender address
        PUBLIC_COINFLIP_CONTRACT, // token escrow contract
        {
          "remove_treasury":
          {
            "amount": `${parseInt(convertDenomToMicroDenom(amount), 10)}`,
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )
      setLoading(false)
      getConfig()
      getBalances()
      if (result && result.transactionHash) {
        // successNotification({ title: 'Remove Treasury Successful', txHash: result.transactionHash })
      }
      notify(true, 'Successfully executed')
    } catch (error) {
      setLoading(false)
      notify(false, `RemoveTreasury error : ${error}`)
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////    Get History            //////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const getRPSHistory = async () => {
    setLoading(true)
    try {
      const response = await signingClient.queryContractSmart(PUBLIC_COINFLIP_CONTRACT, {
        ristory_msg: { count: 5 }
      })

      console.log("=========", response)

      setRHistoryList(response.list)
      setLoading(false)

      notify(true, 'Successfully got History')
    } catch (error) {
      setLoading(false)

      notify(false, `GetHistory Error : ${error}`)
      console.log(error)
    }
  }

  const getFlipHistory = async () => {
    setLoading(true)
    try {
      const response = await signingClient.queryContractSmart(PUBLIC_COINFLIP_CONTRACT, {
        fistory_msg: { count: 5 }
      })

      console.log("=========", response)

      setFHistoryList(response.list)
      setLoading(false)

      notify(true, 'Successfully got History')
    } catch (error) {
      setLoading(false)

      notify(false, `GetHistory Error : ${error}`)
      console.log(error)
    }
  }

  const getDiceHistory = async () => {
    setLoading(true)
    try {
      const response = await signingClient.queryContractSmart(PUBLIC_COINFLIP_CONTRACT, {
        distory_msg: { count: 5 }
      })

      console.log("=========", response)

      setDHistoryList(response.list)
      setLoading(false)

      notify(true, 'Successfully got History')
    } catch (error) {
      setLoading(false)

      notify(false, `GetHistory Error : ${error}`)
      console.log(error)
    }
  }

  return {
    walletAddress,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnect,
    client,
    getConfig,
    config,
    isAdmin,


    getBalances,
    nativeBalanceStr,
    nativeBalance,

    executeRPS,
    executeFlip,
    executeDice,
    executeRemoveTreasury,

    getRPSHistory,
    RPShistoryList,

    getFlipHistory,
    FliphistoryList,

    getDiceHistory,
    DicehistoryList
  }
}
