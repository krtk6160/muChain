import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
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
      contract: null,
      simpleStorage: null
    }
    this.renderDocPage = this.renderDocPage.bind(this);
    this.renderPatientPage = this.renderPatientPage.bind(this);
    this.instantiateContract = this.instantiateContract.bind(this);
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
      this.instantiateContract();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

//   instantiateContract = () => {
// 	console.log('contract initiated');
//   const ABI = [
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "newdoctor",
//         "type": "address"
//       },
//       {
//         "name": "dept",
//         "type": "string"
//       }
//     ],
//     "name": "add",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "dept",
//         "type": "string"
//       }
//     ],
//     "name": "get",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "doctor",
//         "type": "address"
//       },
//       {
//         "name": "_dept",
//         "type": "string"
//       }
//     ],
//     "name": "revoke",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "patient",
//         "type": "address"
//       },
//       {
//         "name": "ipfs_hash",
//         "type": "string"
//       },
//       {
//         "name": "dept",
//         "type": "string"
//       }
//     ],
//     "name": "set",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "patient",
//         "type": "address"
//       },
//       {
//         "name": "dept",
//         "type": "string"
//       }
//     ],
//     "name": "get",
//     "outputs": [
//       {
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]

//   	var contract = new this.state.web3.eth.Contract()
//   }


  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    this.setState({ contract : contract });
    this.setState({ simpleStorage: simpleStorage});
    // simpleStorage.setProvider(this.state.web3.currentProvider)

    // // Declaring this for later so we can chain functions on SimpleStorage.
    // var simpleStorageInstance

    // // Get accounts.
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   simpleStorage.deployed().then((instance) => {
    //     simpleStorageInstance = instance

    //     // Stores a given value, 5 by default.
    //     return simpleStorageInstance.set(5, {from: accounts[0]})
    //   }).then((result) => {
    //     // Get the value from the contract to prove it worked.
    //     return simpleStorageInstance.get.call(accounts[0])
    //   }).then((result) => {
    //     // Update state with the result.
    //     return this.setState({ storageValue: result.c[0] })
    //   })
    // })
  }


  renderDocPage = () => {
	ReactDOM.render(
		<DocPage 
			web3={this.state.web3}
      simpleStorage={this.state.simpleStorage}
      contract={this.state.contract}/>,
		document.getElementById('root')
	)
  }

  renderPatientPage = () => {
  	ReactDOM.render(
		<PatientPage 
    web3={this.state.web3}
      simpleStorage={this.state.simpleStorage}
      contract={this.state.contract}/>,
		document.getElementById('root')
  	)
  }

  render() {
    return (
     <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Hospital Record System</a>
        </nav>

        <main className="container">
          <div className="pure-g">
           <div className="pure-u-1-1">
			       <button type="button" onClick={this.renderDocPage}>Doctor</button>
			       <button type="button" onClick={this.renderPatientPage}>Patient</button>
	         </div>
          </div>
        </main>
    </div>
    );
  }
}

export default App