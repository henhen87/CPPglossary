import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

class AutoComplete extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: null,
			val: '',
			suggestions: []
		}
	}

	componentDidMount() {
		axios.get('getText').then((res) => {
			console.log('DATA FRON', res.data);
			this.setState({
				text: res.data
			});
		});
	}

	onChange(event, { newValue }) {
		this.setState({
			value: newValue
		});
	};

	render() {
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
		}

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