import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function (ComposedComponent) {
    class NetworkDetector extends Component {
        state = {
            isDisconnected: false,
        };

        componentDidMount() {
            this.handleConnectionChange();
            window.addEventListener('online', this.handleConnectionChange);
            window.addEventListener('offline', this.handleConnectionChange);
        }

        componentWillUnmount() {
            window.removeEventListener('online', this.handleConnectionChange);
            window.removeEventListener('offline', this.handleConnectionChange);
        }

        handleConnectionChange = () => {
            const condition = navigator.onLine ? 'online' : 'offline';
            if (condition === 'online') {
                const webPing = setInterval(() => {
                    fetch('//google.com', {
                        mode: 'no-cors',
                    })
                        .then(() => {
                            this.setState({ isDisconnected: false }, () => {
                                return clearInterval(webPing);
                            });
                        })
                        .catch(() => this.setState({ isDisconnected: true }));
                }, 2000);
                return;
            }

            return this.setState({ isDisconnected: true });
        };

        render() {
            const { isDisconnected } = this.state;
            return (
                <div>
                    {isDisconnected ? (
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={true}
                        // onClose={handleClose}
                        >
                            <Alert severity="error">
                                Your network is unavailable. Check your data or wifi connetion
                            </Alert>
                        </Snackbar>
                    ) : null}
                    <ComposedComponent {...this.props} />
                </div>
            );
        }
    }

    return NetworkDetector;
}
