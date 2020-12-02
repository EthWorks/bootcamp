pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract MyToken is IERC20 {
    using SafeMath for uint256;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) approvals;
    uint256 supply;

    constructor(uint _initialBalance) public {
        balances[msg.sender] = _initialBalance;
        supply = _initialBalance;
    }

    function totalSupply() external view override returns (uint256) {
        return supply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return balances[account];
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        return transferInternal(msg.sender, recipient, amount);
    }
    event Transferred(address sender, address recipient, uint256 amount);

    function allowance(address owner, address spender) external override view returns (uint256) {
        return approvals[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        require(msg.sender != spender);
        approvals[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        require(approvals[sender][msg.sender] >= amount, "Not allowed to transfer this amount");
        transferInternal(sender, recipient, amount);
        approvals[sender][msg.sender] = approvals[sender][msg.sender].sub(amount);
        return true;
    }

    function transferInternal(address from, address to, uint256 amount) private returns (bool) {
        require(balances[from] >= amount, "Insufficient funds");
        balances[from] = balances[from].sub(amount);
        balances[to]   = balances[to].add(amount);
        emit Transferred(from, to, amount);
        return true;
    }
}