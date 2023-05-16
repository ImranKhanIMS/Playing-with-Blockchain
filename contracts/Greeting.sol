// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Greeting {
    string private name;
    uint private age;

    uint[] public arr;

    struct Data {
        uint256 id;
        string title;
        uint count;
        bool flag;
    }
    Data private data;

    // Data[] public structArray;

    constructor() {
        name = 'Greeting';
        age = 18;

        arr.push(5);

        data = Data(1,'test',1,false);

        // structArray.push(1,'test',1,false);
        
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


    function getStructId() public view returns(uint256) {
        return data.id;
    }

    function getStructTitle() public view returns(string memory) {
        return data.title;
    }

    function getStructCount() public view returns(uint256) {
        return data.count;
    }

    function getStructFlag() public view returns(bool) {
        return data.flag;
    }
}