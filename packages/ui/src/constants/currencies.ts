import { Currency, Token } from '../model'
import { ChainId } from './chainId'

export const GanacheEther = new Currency(ChainId.Ganache, 'Ganache Ether', 'GETH', 18)

export const NATIVE_CURRENCY = {
  [ChainId.Ganache]: GanacheEther,
}
