import React, { Component } from 'react';
import devicons from './devicons.json';
import DeviconStyle from './devicon-style.jsx'

const fontStyle = {
    fontSize: '40em',
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
}

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
    }

    //All we want to do is display the icon that was chosen
    render() {
        let devicons = this.state.values;
        console.log('where oh where', devicons);

        return(
            <div>
                <DeviconStyle style={getFontStyle} devicon={this.props.devicon} handle={this.choseDevicon} />
                {
                    devicons.map((devicon) => {
                        return <i className={"devicon-" + devicon.name + "-" + devicon.style + (devicon.colored ? " colored" : "")}></i>
                    })
                }
            </div>
        );
    }
}

export default ChosenDevicons;