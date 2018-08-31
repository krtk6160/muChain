import React, { Component } from 'react'
import ipfs from './utils/ipfs.js'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


class DocPage extends Component {
	constructor(props) {
    	super(props)

    	this.state = {
	      	web3: this.props.web3,
	      	contract: this.props.contract,
	      	simpleStorage: this.props.simpleStorage,
	      	patientId: '',
	      	deptId: '',
	      	ipfshash: '',
	      	buffer: '',
	      	account: null
    	}
    	this.handleChange = this.handleChange.bind(this);
    	this.getFile = this.getFile.bind(this);
    	this.uploadRecord = this.uploadRecord.bind(this);
    	this.startcontract();
  	}
  	
  	startcontract()
  	{
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

	getFile = () => {
		var str1="/ipfs/";
		this.simpleStorageInstance.get(this.state.patientId,this.deptId,{ from : this.state.account}).then((result) => {
			this.setState({ipfshash : result})
		})
		var file_to_get = str1.concat(this.state.ipfshash);
		ipfs.get(file_to_get, (err, res) => {
			console.log(err, res[0].content.toString());
		});
  	}

  	handleChange = (evt) => {
  		this.setState({
  			[evt.target.name] : evt.target.value
  		});
  	}


  	uploadRecord = async(evt) => {
    evt.preventDefault();
    console.log("upload invoked");
    await ipfs.add(this.state.buffer, (err, res) => {
        console.log(err, res[0].hash);
        this.simpleStorageInstance.set(this.state.patientId,res[0].hash,this.state.deptId, { from : this.state.account }).then((result)=>{
    	this.setState({ipfshash : res[0]});
    })
    })
    
  }

  	convertToBuffer = async(reader) => {
    const buffer = Buffer.from(reader.result);
    this.setState({
       buffer: buffer
    });
  }

  	captureFile = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const file = evt.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
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
      	<form>
			PatientId: <input type="text" name="patientId" onChange={this.handleChange} /> <br />
			Department: <br />
			<input type="radio" name="deptId" value="Cardiology" onChange={this.handleChange} />Cardiology <br />
			<input type="radio" name="deptId" value="ENT" onChange={this.handleChange} />ENT <br />
			<input type="radio" name="deptId" value="Neurology" onChange={this.handleChange} />Neurology <br />
			<button type="button" onClick={this.getFile}>Fetch</button>
		</form>
		<br /><br /><br /><br />
		<form>
			<input type="file" name="patientMedRecord" onChange={this.captureFile}/>
			<button type="button" onClick={this.uploadRecord}>Upload</button>
		</form>
	    </div>
	    </div>
       </main>
      </div>
    );
  }
}

export default DocPage