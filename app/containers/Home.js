import React, { Component } from 'react';
import AutoComplete from 'components/AutoComplete';

class Home extends Component {
	// constructor(props){
	// 	super(props);

	// 	this.state = {
	// 		text: null
	// 	}
	// }

	// componentDidMount() {
	// 	axios.get('getText').then((res) => {
	// 		console.log('DATA FRON', res.data);
	// 		this.setState({
	// 			text: res.data
	// 		});
	// 	});
	// }

	render () {
		return (
			<div id="home">
				<h2>Number One CPP Glossary</h2>
				<hr/>
				{/*terms 
					? (terms.map((e, i) => <div key={i}>{e}</div>)) : null
				*/}
				<hr/>
				<form autoComplete="off">
					<div className="form-group search-input">
						<AutoComplete />
					</div>
				</form>
			</div>
		);
	}
}

export default Home;