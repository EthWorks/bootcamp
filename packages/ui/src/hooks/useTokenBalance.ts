import { useChainState } from '../providers'
import { CurrencyValue, Token } from '../model'

export function useTokenBalance(token: Token): CurrencyValue | undefined {
  const chainState = useChainState()
  const tokenBalance = chainState?.state?.user?.balances?.[token.address]
  return tokenBalance && new CurrencyValue(token, tokenBalance)
}
