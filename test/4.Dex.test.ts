import {expect} from 'chai';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import MyToken from '../build/MyToken.json';
import Dex from '../build/Dex.json';

describe('Dex', () => {
  const [deployer] = new MockProvider().getWallets()
  let token1;
  let token2;
  let dex;
  
  beforeEach(async () => {
    token1 = await deployContract(deployer, MyToken, [1000]);
    token2 = await deployContract(deployer, MyToken, [2000]);
    dex = await deployContract(deployer, Dex, [token1.address, token2.address]);
  })

  it('Construct', async () => {
    expect(await dex.token1()).to.eq(token1.address);
    expect(await dex.token2()).to.eq(token2.address);
  });

  it('Add liqudity', async () => {
    await dex.addLiquidity(10, 20);
    expect(await token1.balanceOf(dex.address)).eq(10);
    expect(await token2.balanceOf(dex.address)).eq(20);
  });
});