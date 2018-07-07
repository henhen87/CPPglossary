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
		console.log('TERMS HOME', this.state.terms)
		return (
			<div id="home">
				<section className="header">
					<div className="container">
						<h2>Number One CPP Glossary</h2>
					</div>
				</section>
				<hr/>
				<section className="frequent">
					<div className="container">
						<h2><strong>Frequently Searched Terms</strong></h2>
						{this.state.terms ? this.state.terms.map((data, i) => 
							<div key={i} className="frequent-terms">{data.text}</div>
						) : null}
					</div>
				</section>
				<section className="search">
					<div className="container">
						<form autoComplete="off" onSubmit={e => e.preventDefault()}>
							<AutoComplete setDefinition={this.setDefinition} setTerms={this.setTerms} />
						</form>
					</div>
				</section>
				<div>{this.state.definition}</div>
			</div>
		);
	}
}

export default Home;