import React from 'react';
import { api } from '../../services';

export default class TwoFactor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isVerified: false,
            token: '',
            png: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        if (!this.states.isVerified) {
            // Get the QR code from the API
            api.twoFactor()
               .then(function (response) {
                   this.setState({png: response.data});
               });
        }
    }

    base65png () {
        return 'data:image/png;base64,' + this.state.png;
    }

    handleChange (event) {
        this.setState({token: event.target.value});
    }

    handleSubmit (event) {
        event.preventDefault();
        // Send request to API to validate token
        api.twoFactor(this.states.token)
           .then(function (response) {
               // TODO: Go to the next page or something...
               this.setState({isVerified: true});
           })
           .catch(function (error) {
               if (error.response) {
                   switch (error.response.status) {
                       case 500:
                           // Internal Server Error
                           break;

                       case 401:
                           // Unauthorized
                           break;
                   }
               }
           });
    }

    render () {
        if (this.state.isVerified) {
            return (
                <div>
                    <input type="text" value={this.state.token} onChange={this.handleChange} />
                    <button type="button" onClick={this.handleSubmit}>Verify</button>
                </div>
            );
        } else {
            return (
                <div>
                    <img width="25" height="50" alt="Two factor authentication" src={this.base64png} />
                    <input type="text" value={this.state.token} onChange={this.handleChange} />
                    <button type="button" onClick={this.handleSubmit}>Verify</button>
                </div>
            );
        }
    }
}
