import React, { Component } from 'react'
import ipfs from './utils/ipfs.js'

class DocPage extends Component {
	constructor(props) {
    	super(props)

    	this.state = {
	      	web3: this.props.web3,
	      	patientId: '',
	      	deptId: '',
	      	docAddress: null,
	      	buffer: null
    	}

  	this.captureFile = this.captureFile.bind(this);
  	this.getFile = this.getFile.bind(this);
  	this.handleChange = this.handleChange.bind(this);

  	}



  	componentDidMount() {
  		var web3 = this.state.web3;
  		const docAddress = web3.eth.accounts[0];
  		this.setState({docAddress}); //this sets doctor's address in the state
  	}

	getFile = () => {
		//await ipfs.get("/ipfs/Qma71JMRwZc2aVMZ5McmbggfTgMJJQ8k3HKM8GpMeBR2CU", (err, res) => {
		//	console.log(err, res[0].content.toString());
		//});
		let patientId = this.state.patientId, deptId = this.state.deptId;
		console.log(patientId, deptId);
  	}

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
  	uploadRecord = async(evt) => {
	    evt.preventDefault();
	    console.log("upload invoked");
	    await ipfs.add(this.state.buffer, (err, res) => {
	        console.log(err, res[0].hash);
	    });
  	}

  	handleChange = (evt) => {
  		this.setState({
  			[evt.target.name] : evt.target.value
  		});
  	}

	render() {
    return (
      <div>
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
    );
  }
}

export default DocPage