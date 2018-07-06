import React, { Component } from 'react';
import AutoComplete from 'components/AutoComplete';

class Home extends Component {
	state = {
		definition: ''
	}

	setDefinition = (definition) => {
		console.log('set definition', this.state.definition)
		this.setState({ definition });
	}

	render () {
		return (
			<div id="home">
				<h2>Number One CPP Glossary</h2>
				<hr/>
				<form autoComplete="off">
					<AutoComplete setDefinition={this.setDefinition} />
				</form>
				<div>{this.state.definition}</div>
			</div>
		);
	}
}

export default Home;