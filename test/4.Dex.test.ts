import { expect, use } from 'chai'
import { deployContract, MockProvider, solidity } from 'ethereum-waffle'
import { Contract } from 'ethers'
import MyToken from '../build/MyToken.json'
import Dex from '../build/Dex.json'

use(solidity)

describe('Dex', () => {
  const [deployer, client] = new MockProvider().getWallets()
  let token1: Contract
  let token2: Contract
  let dex: Contract

  beforeEach(async () => {
    token1 = await deployContract(deployer, MyToken, [1000])
    token2 = await deployContract(deployer, MyToken, [1000])
    dex = await deployContract(deployer, Dex, [token1.address, token2.address])
  })

  it('Construct', async () => {
    expect(await dex.token1()).to.eq(token1.address)
    expect(await dex.token2()).to.eq(token2.address)
  })

  it('Add liqudity', async () => {
    await token1.approve(dex.address, 100)
    await token2.approve(dex.address, 100)
    await dex.addLiquidity(10, 20)
    expect(await token1.balanceOf(dex.address)).to.eq(10)
    expect(await token2.balanceOf(dex.address)).to.eq(20)
  })

  it('Calculates buy price', async () => {
    await token1.approve(dex.address, 100)
    await token2.approve(dex.address, 100)
    await dex.addLiquidity(10, 20)
    expect(await dex.calculateBuyPrice(2)).to.eq(4)
  })

  it('Calculates sell price', async () => {
    await token1.approve(dex.address, 100)
    await token2.approve(dex.address, 100)
    await dex.addLiquidity(10, 20)
    expect(await dex.calculateSellPrice(10)).to.eq(5)
  })

  it('Transfers correct amount of token2 to buyer', async () => {
    await token1.approve(dex.address, 100)
    await token2.approve(dex.address, 100)
    await dex.addLiquidity(10, 30)

    await token1.transfer(client.address, 5)
    await token1.connect(client).approve(dex.address, 5)
    await dex.connect(client).buy(5)

    expect(await token2.balanceOf(client.address)).to.eq(15)
  })

  it('Transfers correct amount of token1 to seller', async () => {
    await token1.approve(dex.address, 100)
    await token2.approve(dex.address, 100)
    await dex.addLiquidity(10, 30)

    await token2.transfer(client.address, 10)
    await token2.connect(client).approve(dex.address, 10)
    await dex.connect(client).sell(10)

    expect(await token1.balanceOf(client.address)).to.eq(3)
  })
})
