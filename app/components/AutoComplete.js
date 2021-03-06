import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const getSuggestions = (value, terms) => {
	console.log('TERMS IN GET SUGGESTIONS', terms)
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0 
		? [] 
		: terms.filter(term =>
			term.text.toLowerCase().slice(0, inputLength) === inputValue
		);
};

const getSuggestionValue = suggestion => suggestion.text;

const renderSuggestion = suggestion => {
	return (
		<div className={suggestion.text}>
			{suggestion.text}
		</div>
	);
}

// const onSuggestionHighlighted = ({ suggestion }) => {
// 	if (suggestion) {
// 		var selected = '.' + suggestion.text;
// 	}
// 	console.log('SELECTED', selected);
// 	let element = document.querySelector(selected);
// 	console.log(element)
// 	if (element) {
// 		element.style.background = "blue";
// 	}
// }

class AutoComplete extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		text: null,
		value: '',
		terms: [],
		suggestions: [],
		content: [],
	}

	componentDidMount = () => {
		axios.get('getText').then((res) => {
			this.setState({
				text: res.data
			}, () => {
				let text = this.state.text ? this.state.text.split('~') : null;
				let terms = [];
				let el = [];
				console.log('TEXT SPLIT', text)
				if (text) {
					for (let x = 0; x < text.length; x++) {
						if (text[x]) {
							terms.push({text: text[x].slice(0, text[x].indexOf('^'))});
							el.push(
								<div key={x}>
									<strong>{text[x].substr(0, text[x].indexOf('^'))}</strong><br/>
									<pre>{text[x].replace(text[x].substr(0, text[x].indexOf('^') + 1), '')}</pre>
								</div>
							)
						}
					}
					if (terms) {
						console.log('IF TERMS', terms)
						this.props.setTerms(terms);
						this.setState({ terms });
					}
					if (el) {
						this.setState({ content: el }, () => console.log('STATE EL', this.state.content));
					}
				}
			});
		});
	}

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value, this.state.terms)
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	getDefinition = () => {
		console.log('INSIDE GET DEF', typeof this.state.value, this.state.terms)
		for (let x = 0; x < this.state.terms.length; x++) {
			console.log('TERMS X TEXT', this.state.terms[x].text)
			if (this.state.terms[x].text.toLowerCase() === this.state.value.toLowerCase()) {
				console.log('CONTENT', this.state.content[x]);
				this.props.setDefinition(this.state.content[x]);
			}
		}
	}

	render = () => {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'Query Box',
			value,
			onChange: this.onChange
		};

		return (
			<div className="form-group search-input">
				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					// onSuggestionHighlighted={onSuggestionHighlighted}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
				/>
				<button type="submit" onClick={e => {
					e.preventDefault();
					this.getDefinition();
					
				}}></button>
			</div>
		);
	}
}

export default AutoComplete;