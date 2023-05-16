// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Greeting {
    string private name;
    uint private age;
    uint private counter;

    uint[] public arr;

    struct Data {
        uint256 id;
        string title;
        uint count;
        bool flag;
    }
    Data private data;
    Data private dataCustom;
    Data private dataMapping;

    Data[] private structArray;

    // Mapping of Data
    mapping(uint256 => Data) private store;

    constructor() {
        name = 'Greeting';
        age = 18;

        arr.push(5);

        data = Data(1,'test',1,false);

        structArray.push(Data(1,'test',1,false));      
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


    function getData() public view returns(Data memory) {
        return data;
    }

    function getStructArray(uint _index) public view returns(Data memory) {
        return structArray[_index];
    }
    
    function setData(string memory _title, uint _count, bool _flag) public {
        counter++;
        dataCustom = Data(counter, _title, _count, _flag);
    }

    function getDataCustom() public view returns(Data memory) {
        return dataCustom;
    }

    function setStructArray(string memory _title, uint _count, bool _flag) public {
        counter++;
        structArray.push(Data(counter, _title, _count, _flag)); 
    }

    function setMapping(string memory _title, uint _count, bool _flag) public {
        counter++;

        dataMapping = Data(counter, _title, _count, _flag);
        store[counter] = dataMapping;
    }

    function getMapping(uint _index) public view returns(Data memory) {
        return store[_index];
    }
}