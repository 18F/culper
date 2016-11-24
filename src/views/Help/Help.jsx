import React from 'react';
import AuthenticatedView from '../AuthenticatedView';

class Help extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Help</h2>
                <p>Help page stuffs go here</p>
            </div>
        );
    }
}

export default AuthenticatedView(Help);
