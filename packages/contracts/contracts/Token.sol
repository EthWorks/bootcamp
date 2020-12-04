/* SPDX-License-Identifier: MIT */
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
    constructor(
        uint256 amount,
        string memory name,
        string memory symbol,
        uint8 decimals
    ) public ERC20(name, symbol) {
        _setupDecimals(decimals);
        _mint(msg.sender, amount);
    }
}
