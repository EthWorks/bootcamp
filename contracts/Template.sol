/* SPDX-License-Identifier: MIT */
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Template is Ownable {
    using SafeMath for uint256;

    constructor() public {
    }

    function myFunction() public payable {

    }

    function unsafeAdd() public pure returns(uint) {
        uint base = 1;
        return base - 2;
    }

    function safeAdd() public pure  returns(uint) {
        uint base = 1;
        return base.sub(2);
    }
}
