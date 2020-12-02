// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Dex{
    IERC20 public token1;
    IERC20 public token2;
    
    constructor(IERC20 _token1, IERC20 _token2) public {
        token1 = _token1;
        token2 = _token2;
    }
}