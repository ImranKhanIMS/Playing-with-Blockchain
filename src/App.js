import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// ABI
import GreetingABI from "./artififacts/contracts/Greeting.sol/Greeting.json";

// Deployed Greeting Address
const greetingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {

  // state for setting new values to the variables
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");

  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");
  const [flag, setFlag] = useState("");


  // state for getting the values of the variable
  const [n, setN] = useState("");
  const [a, setA] = useState("");

  // array to store struct 'Data'
  const [data, setData] = useState([]);

  // array to store list of struct 'structData'
  const [dataStruct, setDataStruct] = useState([]);

    // array to store mapping struct 'store'
    const [store, setStore] = useState([]);

  const [counter, setCounter] = useState(0);

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
        const name = await contract.getName();
        const age = await contract.getAge();

        // getting struct data and storing in an array state
        const struct = await contract.getData();
        setData(struct);
        // console.log(data[0].toNumber());

        // getting list of struct data and storing in an array state
        const structData = await contract.getStructArray(0);
        setDataStruct(structData);
        // console.log((dataStruct[0]).toNumber());

        // getting mapping struct data and storing in an array state 'store'
        const store = await contract.getMapping(0);
        setStore(store);
        // console.log((store[0]).toNumber());

        // getting the counter value
        const counter = await contract.getCounter();
        setCounter(counter);

        setN(name);
        setA(age.toNumber());
        // console.log(name);
        // console.log(age.toNumber());
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Setting name of Greeting
  const setName = async () => {
    if (!message) return;

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, signer);
      const transaction = await contract.setName(message);
      
      setMessage("");
      await transaction.wait();
      fetchData();
    }
  }

    const setAttributes = async () => {
      if (!message) return;
  
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, signer);
        if(age!="" && message!="") {
        const transaction = await contract.setAttributes(message, age);
          
        setMessage("");
        setAge("");
        
        await transaction.wait();
        fetchData();
      } else {
        alert("please enter all fields!");
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="App">
      <header className="App-header">

    <p> Structure 'Data' Values<br />
      ( <span className='columns'>ID, Title, Count, Flag</span> )<br />
      ( <span className='values'>
          {data[0]?data[0].toNumber():''} &nbsp;
          {data[0]?data[1]:''} &nbsp;
          {data[0]?data[2].toNumber():''} &nbsp;
          {data[0]?data[3]?'True':'False':''}
      </span> )
    </p>

    <p> List of sturcture 'getStructArray' Values<br />
      ( <span className='columns'>ID, Title, Count, Flag</span> )<br />
      ( <span className='values'>
          {dataStruct[0]?(dataStruct[0]).toNumber():''} &nbsp;
          {dataStruct[0]?dataStruct[1]:''} &nbsp;
          {dataStruct[0]?dataStruct[2].toNumber():''} &nbsp;
          {dataStruct[0]?dataStruct[3]?'True':'False':''}
      </span> )
    </p>

    <p> List of mapping 'getMapping' Values<br />
      ( <span className='columns'>ID, Title, Count, Flag</span> )<br />
      ( <span className='values'>
          {store[0]?(store[0]).toNumber():''} &nbsp;
          {store[0]?store[1]:''} &nbsp;
          {store[0]?store[2].toNumber():''} &nbsp;
          {store[0]?store[3]?'True':'False':''}
      </span> )
    </p>

    <p>Counter: {counter!=0?counter:'0'}</p>
{/* just to show what is typing in the box */}
        <p>
          {message}
        </p>
        
        <span className='fields'>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message} type='text' name='value' id='value' placeholder='Name' />
          &nbsp;&nbsp;&nbsp;  {n}
        </span>

        <span className='fields'>
          <input
            onChange={(e) => setAge(e.target.value)}
            value={age} type='text' placeholder='Age' />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {a}
        </span>

        <br />

        <div class="struct">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title} type='text' name='title' id='title' placeholder='Title' />

          <input
            onChange={(e) => setCount(e.target.value)}
            value={count} type='text' name='title' id='count' placeholder='Count' />

          <input
            onChange={(e) => setFlag(e.target.value)}
            value={flag} type='text' name='flag' id='flag' placeholder='Flag' />
        </div>
        
        <div className='allButtons'>
          <button className='button' onClick={fetchData}>Fetch Struct Data</button>
          <button className='button' onClick={setName}>Set Name</button>
          <button className='button' onClick={setAttributes}>Set Attributes</button>
        </div>
        
      </header>
    </div>
  );
}

export default App;
