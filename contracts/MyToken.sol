/* SPDX-License-Identifier: MIT */
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract MyToken is IERC20 {
    using SafeMath for uint;

    uint supply;
    mapping(address => mapping(address => uint)) approvals; // owner => spender => value
    mapping(address => uint) balances;

    event Transfer(address walletFrom, address waletTo, uint amount);

    constructor(uint _initialBalance) public {
        supply = _initialBalance;
        balances[msg.sender] = _initialBalance;
    }

    function totalSupply() external view override returns (uint256) {
        return supply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return balances[account];
    }


    function transfer(address recipient, uint256 amount) external override returns (bool) {
        require(recipient != msg.sender, 'Cannot transfer to himself');
        require(amount != 0, 'Cannot transfer 0');
        require(balances[msg.sender] >= amount, 'Insufficient funds');
        balances[msg.sender] = balances[msg.sender].sub(amount);
        balances[recipient] = balances[recipient].add(amount);
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) external override view returns (uint256) {
        return approvals[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        require(amount <= balances[msg.sender], 'Insufficient funds');
        approvals[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        require(approvals[sender][msg.sender] >= amount, 'Unsufficient allowance');
        require(balances[sender] >= amount, 'Unsufficient funds on sender');
        approvals[sender][recipient] = approvals[sender][recipient].sub(amount);
        balances[sender] = balances[sender].sub(amount);
        balances[recipient] = balances[recipient].add(amount);
        return true;
    }

}