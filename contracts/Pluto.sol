// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PLUTO is ERC20 {
    constructor(uint256 initialSupply) ERC20("PLUTO", "PLT") {
        _mint(msg.sender, initialSupply);
    }
}