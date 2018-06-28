import React, { Component } from 'react';
import { render } from 'react-dom';
import devicons from './devicons.json';
import Autosuggest from 'react-autosuggest';
import DeviconStyle from './devicon-style.jsx';
import ChosenDevicons from './chosen-icon.jsx';
import Grid from '@material-ui/core/Grid';


const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : devicons.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class Devicons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            size: 0
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    itemStyle = {
        suggestion: {
            cursor: 'pointer'
        }
    };

    sendDataToEditor  = () => {
        window.wp.media.editor.insert('Test Hey');
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a programming language',
            value,
            onChange: this.onChange
        };
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={6}>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            theme={this.itemStyle}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ChosenDevicons submit={this.props.submit} devicon={this.state.value} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Devicons