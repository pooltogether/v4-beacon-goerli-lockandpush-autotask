import { Relayer } from 'defender-relay-client'
import { beaconDrawLockAndNetworkTotalSupplyPush } from '@pooltogether/v4-autotask-lib'
import { testnet as contracts } from '@pooltogether/v4-pool-data'

export async function handler(event: any) {
  const relayer = new Relayer(event);
  const config = {
    beaconChain: {
      chainId: 4,
      providerUrl: event.secrets.ethereumRinkebyProviderURL,
    },
    receiverChain: {
      chainId: 0,
      providerUrl: "",
    },
    allPrizePoolNetworkChains: [
      {
        chainId: 4,
        providerUrl: event.secrets.ethereumRinkebyProviderURL,
      },
      {
        chainId: 80001,
        providerUrl: event.secrets.polygonMumbaiProviderURL,
      },
      {
        chainId: 43113,
        providerUrl: event.secrets.avalancheFujiProviderURL,
      },
      {
        chainId: 69,
        providerUrl: event.secrets.optimismKovanProviderURL,
      }
    ]
  }

  try {
    const transactionPopulated = await beaconDrawLockAndNetworkTotalSupplyPush(contracts, config)
    if (transactionPopulated) {
      let transactionSentToNetwork = await relayer.sendTransaction({
        data: transactionPopulated.data,
        to: transactionPopulated.to,
        gasLimit: 500000,
        speed: 'fast'
      });
      console.log('TransactionHash:', transactionSentToNetwork.hash)
    } else {
      throw new Error('DrawBeacon: Transaction not populated')
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}
