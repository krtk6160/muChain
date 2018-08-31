import React, { Component } from 'react'

class PatientPage extends Component {

	componentWillMount() {
		console.log(this.state.web3)
	}

	render() {
    return (
      <div>
			PatientPage
	  </div>
    );
  }
}

export default PatientPage