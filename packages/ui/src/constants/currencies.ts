import { Currency, Token } from '../model'
import { ChainId } from './chainId'

export const GanacheEther = new Currency(ChainId.Ganache, 'Ganache Ether', 'GETH', 18)
export const Janusz = new Token(ChainId.Ganache, '0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da', 'Janusz', 'JAN', 18)
export const Grazyna = new Token(ChainId.Ganache, '0x345cA3e014Aaf5dcA488057592ee47305D9B3e10', 'Grazyna', 'GRA', 18)

export const NATIVE_CURRENCY = {
  [ChainId.Ganache]: GanacheEther,
}
