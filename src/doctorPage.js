import React, { Component } from 'react'

class DocPage extends Component {
	constructor(props) {
    	super(props)

    	this.state = {
	      	web3: this.props.web3,
	      	patientId: '',
	      	deptId: ''
    	}
  	}

	getFile = () => {
		//await ipfs.get("/ipfs/Qma71JMRwZc2aVMZ5McmbggfTgMJJQ8k3HKM8GpMeBR2CU", (err, res) => {
		//	console.log(err, res[0].content.toString());
		//});
		let patientId = this.state.patientId, deptId = this.state.deptId;
		console.log(patientId, deptId);
  	}

  	handleChange = (evt) => {
  		this.setState({
  			[evt.target.name] : evt.target.value
  		});
  	}

	render() {
    return (
      <div>
			<input type="text" name="patientId" onChange={this.handleChange} />
			<input type="text" name="deptId" onChange={this.handleChange} />
			<button type="button" onClick={this.getFile}>Fetch</button>
	  </div>
    );
  }
}

export default DocPage