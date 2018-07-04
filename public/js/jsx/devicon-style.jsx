import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

//Receive the object and display list of styles and output the result

const fontStyle = {
    fontSize: '5em',
    cursor: 'pointer'
};


class DeviconStyle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(this.props.test(this.props.devicon)[0]);
        let deviconStyles = this.props.style(this.props.devicon);
        if (deviconStyles.length > 0) {
            console.log(deviconStyles[0].versions.font);

            return (
                <Grid container spacing={16}>
                    {
                        deviconStyles[0].versions.font.map((devStyle) => {
                            return (
                                <Grid item xs={12} sm={6}>
                                    <i onClick={() => this.props.handle(this.props.devicon, devStyle, true)}  style={fontStyle} className={"devicon-" + this.props.devicon + "-" + devStyle + " colored"}></i>
                                    <i onClick={() => this.props.handle(this.props.devicon, devStyle, false)} style={fontStyle} className={"devicon-" + this.props.devicon + "-" + devStyle}></i>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            )
        }
        return (
            <span></span>
        );
    }
}

export default DeviconStyle;