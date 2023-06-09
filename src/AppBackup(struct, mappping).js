import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// ABI
import GreetingABI from "./artififacts/contracts/Greeting.sol/Greeting.json";

// Deployed Greeting Address
const greetingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {

  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");

  // array to store struct 'Data'
  const [data, setData] = useState([]);
  const [dataCustom, setDataCustom] = useState([]);

  // array to store list of struct 'structData'
  const [dataStruct, setDataStruct] = useState([]);

  // Testting Array State
  let [arr, setArr] = useState([]);
  let [mapArr, setMapArr] = useState([]);

  // array to store mapping struct 'store'
  const [store, setStore] = useState([]);

  const [counter, setCounter] = useState("");
  const [counterMap, setCounterMap] = useState("");

  let array = [];
  let mapArray = [];

  // Helper Functions
  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // Getting name and age from Greeting
  const fetchData = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, provider);
      try {

        // getting struct data and storing in an array state
        const struct = await contract.getData();
        const structUpdate = await contract.getDataCustom();

        // getting struct data custom values 'structDataCustom'
        setData(struct);
        setDataCustom(structUpdate);
        // console.log(data[0].toNumber());

        // getting list of struct data and storing in an array state
        // const structData = await contract.getStructArray(0);
        // setDataStruct(structData);

        // getting mapping struct data and storing in an array state 'store'
        const store = await contract.getMapping(0);
        setStore(store);
        // console.log((store[0]).toNumber());

        // getting the counter value
        const counter = await contract.getCounter();
        setCounter(counter.toNumber());
        // console.log(counter.toNumber());

        // getting the counter for Mapping value
        const counterMap = await contract.getCounterMap();
        setCounterMap(counterMap.toNumber());

        let test;
        for (let i=0; i<counter.toNumber()+1; i++) {

          if (i!=0) {
            test = await contract.getStructArray(i);
            array[i] = test;
          }

          else {
            test = await contract.getStructArray(0);
            array[i] = test;
          }
        }

        // console.log(counterMap.toNumber());
        for (let i=0; i<counterMap.toNumber()+1; i++) {

          if (i!=0) {
            test = await contract.getMapping(i);
            mapArray[i] = test;
          }

          else {
            test = await contract.getMapping(0);
            mapArray[i] = test;
          }
        }

        // assigning 2d array to array state 'arr'
        setArr(array);

        // assigning mapping to array state 'mapArr'
        setMapArr(mapArray);

        //   row.map((data, j) => {
        //     // console.log(data);
        //   })     


      } catch (error) {
        console.log(error);
      }
    }
  }


  // Updating Custom Data of Struct 'Data'
  const updateData = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, signer);
        const transaction = await contract.setData(title, count, true);
  
        await transaction.wait();
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Adding new value to list of structure 'setStructArray'
  const pushDataArray = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, signer);
        const transaction = await contract.setStructArray(title, count, true);
  
        await transaction.wait();
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Adding new value to mapping of structure 'setMapping'
  const pushDataMapping = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, signer);
        const transaction = await contract.setMapping(title, count, true);
  
        await transaction.wait();
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">

    <p> Structure 'Data' Values<br />
      ( <span className='columns'>ID, Title, Count, Flag</span> )<br />
      {/* ( <span className='values'>
          {data[0]?data[0].toNumber():''} &nbsp;
          {data[0]?data[1]:''} &nbsp;
          {data[0]?data[2].toNumber():''} &nbsp;
          {data[0]?data[3]?'True':'False':''}
      </span> )

    <br /> */}

      ( <span className='values'>
          {dataCustom[0]?dataCustom[0].toNumber():''} &nbsp;
          {dataCustom[0]?dataCustom[1]:''} &nbsp;
          {dataCustom[0]?dataCustom[2].toNumber():''} &nbsp;
          {dataCustom[0]?dataCustom[3]?'True':'False':''}
      </span> )
    </p>

<p> List of sturcture 'getStructArray' Values<br />
  ( <span className='columns'>ID, Title, Count, Flag</span> )<br />
  {/* this is for fist record to display */}
  {/* ( <span className='values'>
      {dataStruct[0]?(dataStruct[0]).toNumber():''} &nbsp;
      {dataStruct[0]?dataStruct[1]:''} &nbsp;
      {dataStruct[0]?dataStruct[2].toNumber():''} &nbsp;
      {dataStruct[0]?dataStruct[3]?'True':'False':''}
  </span> )

    <br /> */}


{/* Looping through all the record store in the list of struct (struct array) */}
{  
    arr.map((rec, i) => {
      return (    
      <>
        <span>(</span> <span className='values'>
        {rec[0].toNumber()} &nbsp;
        {rec[1]} &nbsp;
        {rec[2].toNumber()} &nbsp;
        {rec[3]==true?'True':'False'}
        </span> <span>)</span>  <br />
      </>
        );
    })
}
</p>
{/* 0, { counter }, 0 */}
<p> List of mapping 'getMapping' Values<br />
  ( <span className='columns'>ID, Title, Count, Flag</span> )<br />

  {/* ( <span className='values'>
      {store[0]?(store[0]).toNumber():''} &nbsp;
      {store[0]?store[1]:''} &nbsp;
      {store[0]?store[2].toNumber():''} &nbsp;
      {store[0]?store[3]?'True':'False':''}
  </span> ) */}

{/* Looping through all the record store in the list of struct (struct array) */}
{  
    mapArr.map((rec, i) => {
      return (    
      <>
        <span>(</span> <span className='values'>
        {rec[0].toNumber()} &nbsp;
        {rec[1]} &nbsp;
        {rec[2].toNumber()} &nbsp;
        {rec[3]==true?'True':'False'}
        </span> <span>)</span>  <br />
      </>
        );
    })
}

</p>

    <p>Array Counter: <span className='values'>{counter}</span> | Mapping Counter: <span className='values'>{counterMap}</span></p>

    <br /><br />

    <div className='struct'>

      {/* Struct Latest Values: &nbsp; */}
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title} type='text' name='title' id='title' placeholder='Title' /> &nbsp;

      <input
        onChange={(e) => setCount(e.target.value)}
        value={count} type='text' name='count' id='count' placeholder='Count' /> &nbsp;

      <button className='button' onClick={updateData}>Update Data</button>
      <button className='button' onClick={pushDataArray}>Add to List</button>
      <button className='button' onClick={pushDataMapping}>Add to Mapping</button>
    </div> <br /><br /><br />
        
        {/* <br />
        <div className='allButtons'>
          <button className='button' onClick={fetchData}>Fetch Struct Data</button>
        </div>
         */}
      </header>
    </div>
  );
}

export default App;
