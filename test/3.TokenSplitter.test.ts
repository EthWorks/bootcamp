import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import MyToken from '../build/MyToken.json';
import TokenSplitter from '../build/TokenSplitter.json';

use(solidity);

describe.only('MyToken', () => {
    const [wallet, first, second] = new MockProvider().getWallets();
    let token: Contract;
    let splitter: Contract;
  
    beforeEach(async () => {
      token = await deployContract(wallet, MyToken, [1000]);
      splitter = await deployContract(wallet, TokenSplitter, [token.address, first.address, second.address]);
    });

    describe('When approved', () => {
        it('Splits an even value', async => {
            //
            await token.approve(splitter.address, 100);
        })
    })
});  