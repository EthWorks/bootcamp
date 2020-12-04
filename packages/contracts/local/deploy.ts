import { deployContract } from 'ethereum-waffle'
import { Wallet, utils } from 'ethers'
import Token from '../build/Token.json'
import Dex from '../build/Dex.json'
import { deployMulticall } from './multicall'

export async function deploy(wallet: Wallet) {
  const multicall = await deployMulticall(wallet)
  const janusz = await deployContract(wallet, Token, [utils.parseUnits('10000', 18), 'Janusz', 'JAN', 18])
  const grazyna = await deployContract(wallet, Token, [utils.parseUnits('10000', 18), 'Grazyna', 'GRA', 18])
  const dex = await deployContract(wallet, Dex, [janusz.address, grazyna.address])

  return {
    multicall,
    janusz: janusz.address,
    grazyna: grazyna.address,
    dex: dex.address
  }
}
