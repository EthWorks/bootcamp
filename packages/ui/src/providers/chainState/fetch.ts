import { Provider } from '@ethersproject/providers'
import { ChainId, Janusz, Grazyna, DEX_ADDRESS } from '../../constants'
import { ChainState } from './model'
import { allowance, balanceOf, ethBalanceOf, multicall } from './multicall'

export async function fetchChainState(
  provider: Provider,
  chainId: ChainId,
  blockNumber: number,
  account: string
): Promise<ChainState> {
  const calls = [
    ethBalanceOf(chainId, account),
    balanceOf(Janusz.address, account),
    balanceOf(Grazyna.address, account),
    allowance(Janusz.address, account, DEX_ADDRESS[chainId]),
    allowance(Grazyna.address, account, DEX_ADDRESS[chainId]),
  ]
  const result = await multicall(provider, chainId, blockNumber, calls)
  return {
    user: {
      ethBalance: result[0],
      balances: {
        [Janusz.address]: result[1],
        [Grazyna.address]: result[2],
      },
      approvals: {
        [Janusz.address]: result[3],
        [Grazyna.address]: result[4],
      },
    },
    shared: {},
  }
}
