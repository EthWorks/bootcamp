/* SPDX-License-Identifier: MIT */
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract DummyToken is ERC20 {
    constructor(uint256 amount) public ERC20('Dummy', 'Dum') {
        _setupDecimals(1);
        _mint(msg.sender, amount);
    }
}
