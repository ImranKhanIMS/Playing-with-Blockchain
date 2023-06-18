import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
// ABI
import GreetingABI from "./artififacts/contracts/NFT.sol/NFT.json";

import axios from 'axios';
const pinataApiKey = '9b691404018b7c242722';
const pinataSecretApiKey = '0519522db02d2b58fba1f3700df20551ae92ff1b1a8975d5cfe2168e8c2f40fc';

// const cid = 'QmZfFMKR4QuTquQnBD2jBRwwA7RYtZnpYXtXB2EFrypfzF';
// const gatewayURL = `https://ipfs.io/ipfs/${cid}`;
// const pinataSDK = require('@pinata/sdk');
// const pinata = new pinataSDK('9b691404018b7c242722', '0519522db02d2b58fba1f3700df20551ae92ff1b1a8975d5cfe2168e8c2f40fc');

// Deployed Greeting Address
const greetingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

function App() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePinFile = async () => {
    if (file) {
      console.log(file);
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
            },
          });
      
          // console.log('IPFS CID:', response.data.IpfsHash);
          const path = 'https://ipfs.io/ipfs/'+response.data.IpfsHash;
          setImg(path);
          // console.log(path);
          console.log(img);
        } catch (error) {
          console.error('Error pinning file to IPFS:', error);
        }
    } else {
      console.error('No file selected.');
    }
  };
  // new code above

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  let [mapArr, setMapArr] = useState([]);
  const [counterMap, setCounterMap] = useState("");
  let mapArray = [];

  const fetchData = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, provider);
      try {
        const counterMap = await contract.maxSupply();
        setCounterMap(counterMap.toNumber());

        let test;
        for (let i=1; i<counterMap.toNumber()+1; i++) {
            test = await contract.getDomain(i);
            mapArray[i] = test;
        }
        setMapArr(mapArray);

      } catch (error) {
        console.log(error);
      }
    }
  }

  const pushDataMapping = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, signer);
        const transaction = await contract.listDomain(name, cost);
  
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

<p> List of mapping 'getDomain' Values<br />
  ( <span className='columns'>ID, Domain, Cost, isOwned</span> )<br />
{  
    mapArr.map((rec, i) => {
      return (    
      <>
        <span>(</span> <span className='values'>
        {i} &nbsp;
        {rec[0]} &nbsp;
        {rec[1].toNumber()} &nbsp;
        {rec[2]==true?'Yes':<button onClick={
          async () => {
            if (window.ethereum) {
              try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
          
                const contract = new ethers.Contract(greetingAddress, GreetingABI.abi, signer);
                const transaction = await contract.mint(i, {value:rec[1].toNumber()});
          
                await transaction.wait();
                fetchData();
              } catch (error) {
                console.error(error);
              }
            }
          }
        }>Buy Now</button>}
        </span> <span>)</span>  <br />
      </>
        );
    })
}

</p>

    <br /><br />

    <div className='struct'>

      {/* Struct Latest Values: &nbsp; */}
      <input
        onChange={(e) => setName(e.target.value)}
        value={name} type='text' /> &nbsp;

      <input
        onChange={(e) => setCost(e.target.value)}
        value={cost} type='text' /> &nbsp;

      <button className='button' onClick={pushDataMapping}>Add Domain</button>
    </div> <br /><br /><br />
        
        <br />
        <div className='allButtons'>
          <button className='button' onClick={fetchData}>Fetch Data</button>
        </div>



            <h1>Pin File to IPFS</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handlePinFile}>Pin File</button>
            <br />
            <img src={img} width="250px"/>
      </header>
    </div>
  );
}

export default App;
