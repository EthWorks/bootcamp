/* SPDX-License-Identifier: MIT */
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSplitter{
    using SafeMath for uint256;

    IERC20 token;
    address[2] recipients;

    constructor(address _token, address _first, address _second) public {
        token = IERC20(_token);
        recipients[0] = _first;
        recipients[1] = _second;
    }

    function split(uint amount) public {
        uint share = amount.div(2);
        for(uint8 i; i<2; i++){
            token.transferFrom(msg.sender, recipients[i], share);
        }
    }
}