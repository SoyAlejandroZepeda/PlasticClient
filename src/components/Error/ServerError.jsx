import React, { Component } from 'react';

class ServerError extends Component {
    state = {}
    render() {
        return (
            <div className="text-center">
                <h2 className="text-danger">Error 500
                    <span className="text-primary">: Internal Server Error.</span>
                </h2>
            </div>
        );
    }
}

export default ServerError;