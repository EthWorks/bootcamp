pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract EtherSplitter {
    using SafeMath for uint256;
    address payable[2] addresses;
    constructor(address payable a1, address payable a2) public {
        addresses[0] = a1;
        addresses[1] = a2;
    }
    function split() public payable {
        uint256 share = msg.value.div(2);
        uint256 remainder = msg.value.sub(share.mul(2));
        for(uint8 i; i<2; i++){
            addresses[i].transfer(share);
            emit split_done(addresses[i], share);
        }
        if(remainder != 0){
            msg.sender.transfer(remainder);
            emit remainder_returned(msg.sender);
        }
    }
    event split_done(address addr, uint256 amount);
    event remainder_returned(address addr);
}
