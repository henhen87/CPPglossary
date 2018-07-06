import React, { Component } from 'react';
import AutoComplete from 'components/AutoComplete';

class Home extends Component {
	state = {
		definition: '',
		terms: []
	}

	setTerms = terms => {
		console.log('TERMS', terms)
		this.setState({ terms });
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
				{this.state.terms ? this.state.terms.map((data, i) => 
					<div key={i}>{data.text}</div>
				) : null}
				<form autoComplete="off">
					<AutoComplete setDefinition={this.setDefinition} setTerms={this.setTerms} />
				</form>
				<div>{this.state.definition}</div>
			</div>
		);
	}
}

export default Home;