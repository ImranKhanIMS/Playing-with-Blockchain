// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {

    uint public num;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol) {
            num = 20;
    }
}