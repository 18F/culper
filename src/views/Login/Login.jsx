import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/AuthActions';
import LoginButton from '../../components/Login/Login';
import { redirectTo } from '../../actions/RouteActions';
import { checkAuthentication } from '../../actions/AuthActions';
import { api } from '../../services/api';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            username: '',
            password: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.login = this.login.bind(this);
        console.debug('Login View');
    }

    onUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    login() {
        // TODO Validation rules
        console.debug('Logging in: ', this.state.username, this.state.password);
        this.props.dispatch(login(this.state.username, this.state.password));

    }

    render() {
        const panelStyle = {
            marginBottom: '20px'
        };

        return (
            <div>
                <h2>Login</h2>
                <div style={panelStyle}>
                    <p>
                        Enter your username and password, then click the "Submit" button to continue. If you do not remember your password click "Forgot Password". If you do not remember your username contact your sponsoring agency.
                    </p>
                    <div>
                        <input type="text" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
                    </div>
                    <div>
                        <button onClick={this.login}>Submit</button>
                        <button>Cancel</button>
                    </div>
                </div>

                <div>
                    <div>Login using OAuth Provider</div>
                    <LoginButton authenticated={this.state.authenticated} />
                </div>
            </div>
        );
    }
}
/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 *
 */
function mapStateToProps(state) {
    const auth = state.authentication;

    console.log('Login mapStateToProps: ', auth.authenticated);
    return {
        authenticated: auth.authenticated,
        token: auth.token
    };
}


// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(Login);
