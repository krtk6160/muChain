import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import ipfs from './utils/ipfs.js'
import DocPage from './doctorPage.js'
import PatientPage from './patientPage.js'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      hash: null,
      buffer: null
    }
    this.renderDocPage = this.renderDocPage.bind(this);
    this.renderPatientPage = this.renderPatientPage.bind(this);
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

 //  function instantiateContract() {
	// const ABI = [
	// {
	// 	"constant": false,
	// 	"inputs": [
	// 		{
	// 			"name": "newdoctor",
	// 			"type": "address"
	// 		},
	// 		{
	// 			"name": "dept",
	// 			"type": "string"
	// 		}
	// 	],
	// 	"name": "add",
	// 	"outputs": [],
	// 	"payable": false,
	// 	"stateMutability": "nonpayable",
	// 	"type": "function"
	// },
	// {
	// 	"constant": false,
	// 	"inputs": [
	// 		{
	// 			"name": "patient",
	// 			"type": "address"
	// 		},
	// 		{
	// 			"name": "ipfs_hash",
	// 			"type": "string"
	// 		},
	// 		{
	// 			"name": "dept",
	// 			"type": "string"
	// 		}
	// 	],
	// 	"name": "set",
	// 	"outputs": [],
	// 	"payable": false,
	// 	"stateMutability": "nonpayable",
	// 	"type": "function"
	// },
	// {
	// 	"constant": true,
	// 	"inputs": [
	// 		{
	// 			"name": "patient",
	// 			"type": "address"
	// 		},
	// 		{
	// 			"name": "dept",
	// 			"type": "string"
	// 		}
	// 	],
	// 	"name": "get",
	// 	"outputs": [
	// 		{
	// 			"name": "",
	// 			"type": "string"
	// 		}
	// 	],
	// 	"payable": false,
	// 	"stateMutability": "view",
	// 	"type": "function"
	// }
	// ]

 //  	var contract = new web3.eth.Contract()
 //  }

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

  getFile = async(hash) => {
	await ipfs.get("/ipfs/Qma71JMRwZc2aVMZ5McmbggfTgMJJQ8k3HKM8GpMeBR2CU", (err, res) => {
		console.log(err, res[0].content.toString());
	});
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
  renderDocPage = () => {
	ReactDOM.render(
		<DocPage 
			web3={this.state.web3}/>,
		document.getElementById('root')
	)
  }

  renderPatientPage = () => {
  	ReactDOM.render(
		<PatientPage />,
		document.getElementById('root')
  	)
  }

  render() {
    return (
      <div>
			<button type="button" onClick={this.renderDocPage}>Doctor</button>
			<button type="button" onClick={this.renderPatientPage}>Patient</button>
	  </div>
    );
  }
}

export default App