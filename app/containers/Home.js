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
		let terms = [];
		let el = [];
		if (text) {
			for (let x = 0; x < text.length; x++) {
				terms.push(text[x].slice(0, text[x].indexOf('^')));
				console.log('text', text[x]);
				// text[x] = text[x].replace('^', ':');
				el.push(
					<div key={x}>
						<strong>{text[x].substr(0, text[x].indexOf('^'))}</strong><br/>
						<p>{text[x].replace(text[x].substr(0, text[x].indexOf('^') + 1), '')}</p>
					</div>
				)
			}
		}
		return (
			<div id="home">
				<h2>word</h2>
				<hr/>
				{terms 
					? (terms.map((e, i) => <div key={i}>{e}</div>)) : null
				}
				<hr/>
				{el}
			</div>
		);
	}
}

export default Home;