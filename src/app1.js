import React, { Component } from 'react'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import ipfs from './utils/ipfs.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      hash: null,
      buffer: null
    }
    this.upload = this.upload.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.getfile = this.getfile.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  //function written by Kartik Shah (krtk6160)
  captureFile = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const file = evt.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  //function written by Kartik Shah (krtk6160)
  convertToBuffer = async(reader) => {
    const buffer = Buffer.from(reader.result);
    this.setState({
       buffer: buffer
    });
  }

  //function written by Kartik Shah (krtk6160)
  upload = async(evt) => {
    evt.preventDefault();
    console.log("upload invoked");
    await ipfs.add(this.state.buffer, (err, res) => {
        console.log(err, res[0].hash);
    })
  }

  getfile = (evt) => {
    evt.preventDefault();
    console.log('getting file');
    ipfs.get(this.state.ipfs,(err,res) =>{
      if(err)
      {
        console.log(err);
      }
      else{
        console.log(res);
      }
    })
  }

  // instantiateContract() {
  //   /*
  //    * SMART CONTRACT EXAMPLE
  //    *
  //    * Normally these functions would be called in the context of a
  //    * state management library, but for convenience I've placed them here.
  //    */

  //   const contract = require('truffle-contract')
  //   const simpleStorage = contract(SimpleStorageContract)
  //   simpleStorage.setProvider(this.state.web3.currentProvider)

  //   // Declaring this for later so we can chain functions on SimpleStorage.
  //   var simpleStorageInstance

  //   // Get accounts.
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     simpleStorage.deployed().then((instance) => {
  //       simpleStorageInstance = instance

  //       // Stores a given value, 5 by default.
  //       return simpleStorageInstance.set(5, {from: accounts[0]})
  //     }).then((result) => {
  //       // Get the value from the contract to prove it worked.
  //       return simpleStorageInstance.get.call(accounts[0])
  //     }).then((result) => {
  //       // Update state with the result.
  //       return this.setState({ storageValue: result.c[0] })
  //     })
  //   })
  // }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.upload}>
          <input type="file" onChange={this.captureFile}/>
          <input type="submit" /><br />
          Enter patient address:<input type="text" /><br/>
          Enter deptartment name:
          <input type="text" /><br /><br />
          <input type="button" value="Get Details" onclick={this.getfile} /><br /><br/>
        </form>
      </div>
    );
  }
}

export default App
