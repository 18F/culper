import React from 'react';
import { connect } from 'react-redux';
import { redirectTo } from '../actions/RouteActions';
import { api } from '../services/api';


/**
 * AuthenticatedView is a higher-order component that wraps a component
 * and dispatches an action that redirects to the login page when the user
 * is not authenticated.
 */
function AuthenticatedView (WrappedComponent) {
    // Note that we wrap with connect to include access to dispatcher.
    return connect(mapStateToProps)(class RequiresAuth extends React.Component {

        constructor(props) {
            super(props);
            console.log('AuthenticatedView Wrapper');
        }

        componentWillMount() {
            // Check if we have a token in the url
            if (!this.props.authenticated) {
                this.props.dispatch(redirectTo('/login'));
            }
        }

        render() {
            if (this.props.authenticated) {
                return (
                    <WrappedComponent />
                );
            }
            return null;
        }
    });
}

function mapStateToProps(state) {
    const auth = state.authentication;
    return {
        authenticated: auth.authenticated,
        token: auth.token
    };
}

export default AuthenticatedView;
