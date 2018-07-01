import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
	constructor(props){
		super(props);

		this.state = {
			text: null
		}

		console.log('STATE TEXT', this.state.text)
	}

	componentDidMount() {
		axios.get('getText').then((res) => {
			console.log('DATA FRON', res.data);
			this.setState({
				text: res.data
			});
		});
	}

	render () {
		return (
			<div id="home">
				Hello Elena
				<hr/>
				<hr/>
				{this.state.text 
					? (
						<div>{this.state.text}</div>
					) : null
				}
			</div>
		);
	}
}

export default Home;