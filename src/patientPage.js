import React, { Component } from 'react'

class PatientPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			web3: this.props.web3
		}
	}

	componentWillMount() {

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