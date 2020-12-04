import { Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '../../constants'
import { ChainState } from './model'
import { balanceOf, ethBalanceOf, multicall, totalSupply } from './multicall'

export async function fetchChainState(
  provider: Provider,
  chainId: ChainId,
  blockNumber: number,
  account: string
): Promise<ChainState> {
  const result = await multicall(provider, chainId, blockNumber, [ethBalanceOf(chainId, account)])
  return {
    user: {
      ethBalance: result[0],
      daiBalance: BigNumber.from(0),
    },
    shared: {
      daiTotalSupply: BigNumber.from(0),
    },
  }
}
