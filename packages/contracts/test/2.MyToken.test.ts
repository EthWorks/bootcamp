import { expect } from 'chai'
import { Contract } from 'ethers'
import { deployContract, MockProvider } from 'ethereum-waffle'
import MyToken from '../build/MyToken.json'

describe('MyToken', () => {
  const [wallet, walletTo] = new MockProvider().getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployContract(wallet, MyToken, [1000])
  })

  it('Assigns initial balance', async () => {
    expect(await token.balanceOf(wallet.address)).to.equal(1000)
  })

  it('Transfer adds amount to destination account', async () => {
    await token.transfer(walletTo.address, 7)
    expect(await token.balanceOf(walletTo.address)).to.equal(7)
  })

  it('Can not transfer above the amount', async () => {
    await expect(token.transfer(walletTo.address, 1007)).to.be.reverted
  })

  it('Can not transfer from empty account', async () => {
    const tokenFromOtherWallet = token.connect(walletTo)
    await expect(tokenFromOtherWallet.transfer(wallet.address, 1)).to.be.reverted
  })

  it('Assigns allowance', async () => {
    await expect(token.approve(walletTo.address, 20)).to.not.be.reverted
    expect(await token.allowance(wallet.address, walletTo.address)).to.eq(20)
  })

  it('Performs transferFrom when allowed', async () => {
    const tokenFromOtherWallet = token.connect(walletTo)
    await token.approve(walletTo.address, 20)
    await expect(tokenFromOtherWallet.transferFrom(wallet.address, walletTo.address, 10)).to.not.be.reverted
    expect(await token.balanceOf(walletTo.address)).to.eq(10)
  })

  it('Fails transferFrom when NOT allowed', async () => {
    const tokenFromOtherWallet = token.connect(walletTo)
    await expect(tokenFromOtherWallet.transferFrom(wallet.address, walletTo.address, 10)).to.be.reverted
  })

  it('Fails transferFrom when allowed too small amount', async () => {
    const tokenFromOtherWallet = token.connect(walletTo)
    await token.approve(walletTo.address, 20)
    await expect(tokenFromOtherWallet.transferFrom(wallet.address, walletTo.address, 50)).to.be.reverted
  })

  it('Deducts correct amount from allowance', async () => {
    const tokenFromOtherWallet = token.connect(walletTo)
    await token.approve(walletTo.address, 20)
    await expect(tokenFromOtherWallet.transferFrom(wallet.address, walletTo.address, 10)).to.not.be.reverted
    expect(await token.allowance(wallet.address, walletTo.address)).to.eq(10)
  })
})
