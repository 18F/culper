class OAuth {
    constructor (service) {
        this.url = 'http://localhost:3000/auth/' + service;
        this.token = '';
        this.expiration = null;
    }

    getQueryValue (key) {
        let query = window.location.search.substring(1);
        let vars = query.split('&');
        let values = [];

        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (pair[0] === key) {
                values.push(pair[1]);
            }
        }

        if (values.length === 0) {
            return null;
        } else if (values.length === 1) {
            return values[0];
        }

        return values;
    }

    logout () {
        console.log('logging out');
        this.token = '';
        this.expiration = null;
    }

    refreshToken () {
        console.log('requesting new token');

        if (token) {
            // TODO: Just request a refreshed token
            return;
        }

        // TODO: Request authorization from OAuth provider
    }

    authenticated () {
        console.log('determining authentication status');
        if (!this.token) {
            return false;
        }

        let expired = !this.expiration || this.expiration > new Date();
        if (expired) {
            return false;
        }

        return true;
    }
}

const GithubOAuth = new OAuth('github');
export { GithubOAuth };
