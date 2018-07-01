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
		let text = this.state.text ? this.state.text.split('~') : null;
		return (
			<div id="home">
				<h2>Elena</h2>
				<hr/>
				<hr/>
				{text 
					? (
						<div>{text.map((e, i) => <div key={i}>{e}</div>)}</div>
					) : null
				}
			</div>
		);
	}
}

export default Home;