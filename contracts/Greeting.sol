// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Greeting {
    // normal solidity variables
    string private name;
    uint private age;
    uint private counter;

    // list
    uint[] public arr;

    // structure
    struct Data {
        uint256 id;
        string title;
        uint count;
        bool flag;
    }
    // structure objects
    Data private data;
    Data private dataCustom;
    Data private dataMapping;

    // list of structure Data
    Data[] private structArray;

    // Mapping of structure Data
    mapping(uint256 => Data) private store;

    constructor() {
        name = 'Greeting';
        age = 18;

        arr.push(5);

        data = Data(1,'test',1,false);

        structArray.push(Data(1,'test',1,false));

        store[0] = Data(1,'test',1,false);    
    }

    // method to return name
    function getName() public view returns(string memory){
        return name;
    }

    // method to return age
    function getAge() public view returns(uint){
        return age;
    }

    // method to set new name
    function setName(string memory _name) public{
        name = _name;
    }

    // method to set new age
    function setAge(uint _age) public{
        age = _age;
    }

    // method to set new name and new age
    function setAttributes(string memory _name, uint _age) public payable {
        name = _name;
        age = _age;
    }

    // method to return counter
    function getCounter() public view returns(uint){
        return counter;
    }


    // method to get id from structure Data
    function getStructId() public view returns(uint256) {
        return data.id;
    }

    // method to get title from structure Data
    function getStructTitle() public view returns(string memory) {
        return data.title;
    }

    // method to get count from structure Data
    function getStructCount() public view returns(uint256) {
        return data.count;
    }

    // method to get flag from structure Data
    function getStructFlag() public view returns(bool) {
        return data.flag;
    }


    // method to get all variables from structure Data
    function getData() public view returns(Data memory) {
        return data;
    }

    // method to set all variables of structure Data
    function setData(string memory _title, uint _count, bool _flag) public {
        counter++;
        dataCustom = Data(counter, _title, _count, _flag);
    }

    // method to get the new data set by setData method
    function getDataCustom() public view returns(Data memory) {
        return dataCustom;
    }

    // method to get list of specified index
    function getStructArray(uint _index) public view returns(Data memory) {
        return structArray[_index];
    }

    // method for putting values at structure list structArray
    function setStructArray(string memory _title, uint _count, bool _flag) public {
        counter++;
        structArray.push(Data(counter, _title, _count, _flag)); 
    }

    // method for putting values to the mapping 'store'
    function setMapping(string memory _title, uint _count, bool _flag) public {
        counter++;

        dataMapping = Data(counter, _title, _count, _flag);
        store[counter] = dataMapping;
    }

    // method to get values from the mapping 'store' of the specified index
    function getMapping(uint _index) public view returns(Data memory) {
        return store[_index];
    }
}