import React, { Component } from 'react';
import AutoComplete from 'components/AutoComplete';

class Home extends Component {
	render () {
		return (
			<div id="home">
				<h2>Number One CPP Glossary</h2>
				<hr/>
				<form autoComplete="off">
					<AutoComplete />
				</form>
			</div>
		);
	}
}

export default Home;