//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LAWswap {
    //state variables
    address mars;
    address pluto;
    uint256 xchangeRate;

    //events
    event successfulPlutoSwap(uint256 amountIn, uint amountOut);
    event successfulMarsSwap(uint _amountIn, uint _amountOut);

    constructor(address _mars, address _pluto, uint256 _xchangeRate) {
        mars = _mars;
        pluto = _pluto;
        xchangeRate = _xchangeRate;
    }

    function swapMarsToPluto(uint _amount) external {
        //sanity check
        require(msg.sender != address(0), "address zero detected");
        require(_amount > 0, "cant swap 0 amount");

        //check balance of sender
        require(
            IERC20(mars).balanceOf(msg.sender) >= _amount,
            "insufficient fund"
        );

        //calculate the xchange rate
        uint256 _plutoEquivalent = _amount * xchangeRate;
        require(
            IERC20(pluto).balanceOf(address(this)) >= _plutoEquivalent,
            "unable to dispense cash"
        );

        require(
            IERC20(mars).transferFrom(msg.sender, address(this), _amount),
            "sorry, unable to transfer"
        );
        require(
            IERC20(pluto).transfer(msg.sender, _plutoEquivalent),
            "transaction failed"
        );
        emit successfulPlutoSwap(_amount, _plutoEquivalent);
    }

    function swapPlutoToMars(uint _amount) external {
        //sanity check
        require(msg.sender != address(0), "address 0 dectected");
        require(_amount > 0, "cant swap 0 amount");

        //check the balance of the sender
        require(
            IERC20(pluto).balanceOf(msg.sender) >= _amount,
            "insufficient fund"
        );

        //calculate the xchange rate
        uint _marsEquivalent = _amount / xchangeRate;

        require(
            IERC20(mars).balanceOf(address(this)) >= _marsEquivalent,
            "unable to dispense cash"
        );

        require(
            IERC20(pluto).transferFrom(msg.sender, address(this), _amount),
            "sorry, unable to transfer"
        );
        require(
            IERC20(mars).transfer(msg.sender, _marsEquivalent),
            "transaction failed"
        );
        emit successfulMarsSwap(_amount, _marsEquivalent);
    }
}
