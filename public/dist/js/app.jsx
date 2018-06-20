/*
    ./client/components/App.jsx
*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen} variant="contained" color="primary">
                    Devicon
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div>
                        <Typography variant="title" id="modal-title">
                            Text in a modal
                        </Typography>
                        <Typography variant="subheading" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}