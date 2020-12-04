import { expect } from 'chai'
import { Contract } from 'ethers'
import { deployContract, MockProvider } from 'ethereum-waffle'
import EtherSplitter from '../build/EtherSplitter.json'

describe('Ether Splitter', () => {
  const [wallet, first, second] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(wallet, EtherSplitter, [first.address, second.address])
  })

  it('Deploys correctly and has an address', async () => {
    expect(splitter.address).to.be.properAddress
  })

  it('Splits even amount of ether', async () => {
    const initialBalance = await second.getBalance()
    await splitter.split({ value: 100 })
    expect(await second.getBalance()).to.eq(initialBalance.add(50))
  })

  it('Splits uneven amount of ether', async () => {
    const firstInitialBalance = await first.getBalance()
    const secondInitialBalance = await second.getBalance()
    const walletInitialBalance = await wallet.getBalance()
    await splitter.split({ value: 101 })
    expect(await first.getBalance()).to.eq(firstInitialBalance.add(50))
    expect(await second.getBalance()).to.eq(secondInitialBalance.add(50))
    expect(await wallet.getBalance()).to.lt(walletInitialBalance.sub(100))
    expect(await splitter.provider.getBalance(splitter.address)).to.eq(0)
  })

  it('Emits an event about each account on split', async () => {
    await expect(splitter.split({ value: 100 }))
      .to.emit(splitter, 'split_done')
      .withArgs(first.address, 50)
    await expect(splitter.split({ value: 100 }))
      .to.emit(splitter, 'split_done')
      .withArgs(second.address, 50)
  })
  it('Emits an event when remainder is returned', async () => {
    await expect(splitter.split({ value: 101 }))
      .to.emit(splitter, 'remainder_returned')
      .withArgs(wallet.address)
  })
  it('Emits no remainder event if the remainder isnt returned', async () => {
    await expect(splitter.split({ value: 100 }))
      .to.not.emit(splitter, 'remainder_returned')
      .withArgs(wallet.address)
  })
})
