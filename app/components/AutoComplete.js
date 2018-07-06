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
	console.log('SUGGESTION', suggestion)
	return (
		<div>
			{suggestion.text}
		</div>
	);
}

class AutoComplete extends Component {
	state = {
		text: null,
		value: '',
		terms: [],
		suggestions: []
	}

	componentDidMount = () => {
		axios.get('getText').then((res) => {
			console.log('DATA FRON', res.data);
			this.setState({
				text: res.data
			}, () => {
				let text = this.state.text ? this.state.text.split('~') : null;
				let terms = [];
				let el = [];
				if (text) {
					for (let x = 0; x < text.length; x++) {
						terms.push({text: text[x].slice(0, text[x].indexOf('^'))});
						el.push(
							<div key={x}>
								<strong>{text[x].substr(0, text[x].indexOf('^'))}</strong><br/>
								<pre>{text[x].replace(text[x].substr(0, text[x].indexOf('^') + 1), '')}</pre>
							</div>
						)
					}
					console.log('TERMS', terms)
					if (terms) {
						this.setState({ terms });
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
		console.log('TERMS IN ON SUGGESTIONS FETCH REQUESTED', this.state.terms)
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

	render = () => {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'Query Box',
			value,
			onChange: this.onChange
		};

		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
			/>
		);
	}
}

export default AutoComplete;