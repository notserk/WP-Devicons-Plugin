import React, { Component } from 'react';
import devicons from './devicons.json';
import DeviconStyle from './devicon-style.jsx'
import Button from '@material-ui/core/Button';

const fontStyle = {
    fontSize: '10em',
    cursor: 'pointer'
};


const getFontStyle = name => {

    let fontStyles = devicons.filter( devicon =>
        devicon.name === name
    );

    if(fontStyles.length > 0 ){
        return fontStyles;
    }

    return [];
};

class ChosenDevicons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: []
        };
    }

    choseDevicon = (technology, style, colored) => {
        //Push value on state
        this.setState((prevState) => {
            //if prevState
            let prevValues = prevState.values;
            prevValues.push({name: technology, style: style, colored: colored})

            return {values: prevValues}
        });


    };

    //Map chosen Devicons to output shortcode
    mapDevicons = () => {
        //run after the

        let returnedIcons = '';

        this.state.values.forEach( (devicon) => {
            returnedIcons += '[devicons name=' + '"' + devicon.name + '"' + '  style=' + '"' + devicon.style + '"' + ' colored=' + '"' + (devicon.colored ? "true" : "") + '"]'
        });

        //send text back to editor
        window.wp.media.editor.insert(returnedIcons);

        //Close the modal
        this.props.submit();
    };

    //All we want to do is display the icon that was chosen
    render() {
        let devicons = this.state.values;

        return(
            <div>
                <DeviconStyle style={getFontStyle} devicon={this.props.devicon} handle={this.choseDevicon} />
                <h2>Chosen Devicons</h2>
                {
                    devicons.map((devicon) => {
                        return <i style={fontStyle} className={"devicon-" + devicon.name + "-" + devicon.style + (devicon.colored ? " colored" : "")}></i>
                    })
                }
                <Button onClick={this.mapDevicons} variant="contained">
                    Add Shortcode
                </Button>
            </div>
        );
    }
}

export default ChosenDevicons;