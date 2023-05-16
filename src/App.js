import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// ABI
import GreetingABI from "./artififacts/contracts/Greeting.sol/Greeting.json";

// Deployed Greeting Address
const greetingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {

  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");
  const [n, setN] = useState("");
  const [a, setA] = useState("");

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
        const name = await contract.name();
        const age = await contract.getAge();
        setN(name);
        setA(age.toNumber());
        console.log(name);
        console.log(age.toNumber());
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
        <p>
          Blockchain Data ({message})
        </p>
        
        <span>Name: {n}</span>
        <span>Age: {a}</span>

        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message} type='text' name='value' id='value' placeholder='Name' /><br />
          <input
            onChange={(e) => setAge(e.target.value)}
            value={age} type='text' placeholder='Age' /><br />
        <button onClick={fetchData}>Fetch</button><br />
        <button onClick={setName}>Set Name</button><br />
        <button onClick={setAttributes}>Set Attributes</button>
      </header>
    </div>
  );
}

export default App;
