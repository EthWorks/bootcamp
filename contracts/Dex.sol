// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Dex{
    using SafeMath for uint;

    IERC20 public token1;
    IERC20 public token2;
    
    constructor(IERC20 _token1, IERC20 _token2) public {
        token1 = _token1;
        token2 = _token2;
    }

    function addLiquidity(uint t1Amount, uint t2Amount) public payable {
        token1.transferFrom(msg.sender, address(this), t1Amount);
        token2.transferFrom(msg.sender, address(this), t2Amount);
    }

    function calculateT2T1Ratio() private view returns (uint) {
        return token2.balanceOf(address(this)).div(token1.balanceOf(address(this)));
    }

    function calculateBuyPrice(uint amount) public view returns (uint) {
        return amount.mul(calculateT2T1Ratio());
    }

    function calculateSellPrice(uint amount) public view returns (uint) {
        return amount.div(calculateT2T1Ratio());
    }

    function buy(uint amount) public {
        uint howMuch = calculateBuyPrice(amount);
        token1.transferFrom(msg.sender, address(this), amount);
        token2.transfer(msg.sender, howMuch);
    }

    function sell(uint amount) public {
        uint howMuch = calculateSellPrice(amount);
        token2.transferFrom(msg.sender, address(this), amount);
        token1.transfer(msg.sender, howMuch);
    }

    // a/b = c/d => a * d = c * b
}