import React, { Component } from 'react'
import ipfs from './utils/ipfs.js'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


class PatientPage extends Component {

	constructor(props) {
    	super(props)

    	this.state = {
	      	web3: this.props.web3,
	      	contract: this.props.contract,
	      	simpleStorage: this.props.simpleStorage,
	      	doctorId: '',
	      	deptId: '',
	      	ipfshash: '',
	      	buffer: '',
	      	account: null
    	}
    	
    	this.startcontract();
  	}	

  	startcontract(){
  		const contract = this.state.contract; 		
  		const simpleStorage = this.state.simpleStorage;

  		simpleStorage.setProvider(this.state.web3.currentProvider)

  		this.state.web3.eth.getAccounts((error,accounts) => {
  			simpleStorage.deployed().then((instance) => {
  				this.simpleStorageInstance = instance
  				this.setState({account : accounts[0]})
  			})
  		})
  	}


  	handleChange = (evt) => {
  		this.setState({
  			[evt.target.name] : evt.target.value
  		});
  	}

  	getFile = () => {
		var str1="/ipfs/";
		this.simpleStorageInstance.get(this.deptId,{ from : this.state.account}).then((result) => {
			this.setState({ipfshash : result})
		})
		var file_to_get = str1.concat(this.state.ipfshash);
		ipfs.get(file_to_get, (err, res) => {
			console.log(err, res[0].content.toString());
		});
  	}

  	adddoc = () => {
  		this.simpleStorageInstance.add(this.state.doctorId,this.state.deptId, { from : this.state.account}).then((result)=>{
  			alert('Doctor Added');
  		})
  	}

  	remdoc = () =>{
  		this.simpleStorageInstance.revoke(this.state.doctorId,this.state.deptId, {from : this.state.account}).then((result)=> {
  			alert('Doctor Access Revoked!');
  		})
  	}

	render(){
		return(
	 <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Hospital Record System</a>
        </nav>

        <main className="container">
          <div className="pure-g">
			<div className="pure-u-1-1">
				<form>
				DoctorId: <input type="text" name="doctorId" onChange={this.handleChange} /> <br />
			Department: <br />
			<input type="radio" name="deptId" value="Cardiology" onChange={this.handleChange} />Cardiology <br />
			<input type="radio" name="deptId" value="ENT" onChange={this.handleChange} />ENT <br />
			<input type="radio" name="deptId" value="Neurology" onChange={this.handleChange} />Neurology <br />
			<button type="button" onClick={this.getFile}>Fetch</button>
			<button type="button" onClick={this.adddoc}>Add Doctor</button> 
			<button type="button" onClick={this.remdoc}>Remove Doctor</button>
				</form>
		    </div>
		  </div>
        </main>
      </div>
		);
	}

}

export default PatientPage