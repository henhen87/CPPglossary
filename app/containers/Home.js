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
				<section className="title">
					<div className="container">
						<div className="header">
							<img className="img-responsive" src="/img/dic-mag-2.jpg" alt="Loading..."/>
							Number One CPP Glossary
							<img className="img-responsive" src="/img/dic-mag.jpg" alt="Loading..."/>
						</div>

					</div>
				</section>
				<section className="search">
					<div className="container">
						<h2><strong>Frequently Searched Terms</strong></h2>
						{this.state.terms ? this.state.terms.map((data, i) => 
							<div key={i} className="frequent-terms">{data.text}</div>
						) : null}
						<form autoComplete="off" onSubmit={e => e.preventDefault()}>
							<AutoComplete setDefinition={this.setDefinition} setTerms={this.setTerms} />
						</form>
					</div>
				</section>
				<section className="definition">
					<div className="container">
						<div>{this.state.definition}</div>
					</div>
				</section>
				<section className="cartoon">
				</section>
			</div>
		);
	}
}

export default Home;