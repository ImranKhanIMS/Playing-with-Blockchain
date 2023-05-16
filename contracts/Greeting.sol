// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Greeting {
    string public name;
    uint public age;

    constructor() {
        name = 'Greeting';
        age = 18;
    }

    function getName() public view returns(string memory){
        return name;
    }

    function getAge() public view returns(uint){
        return age;
    }

    function setName(string memory _name) public{
        name = _name;
    }

    function setAge(uint _age) public{
        age = _age;
    }

    function setAttributes(string memory _name, uint _age) public payable {
        name = _name;
        age = _age;
    }
}