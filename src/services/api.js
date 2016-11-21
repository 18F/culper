import axios from 'axios';

class Api {
    constructor () {
        this.proxy = axios.create({
            baseURL: 'https://localhost:3000',
            timeout: 1000,
        });

        this.proxySecured = axios.create({
            baseURL: 'https://localhost:3000',
            timeout: 1000,
            headers: {'Authorization': ''},
        });
    }

    setToken (token) {
        this.proxySecured.defaults.headers.common.Authorization = token;
    }

    information () {
        return this.proxy.get('/');
    }

    twoFactor (token) {
        if (token) {
            return this.proxySecured.post('/2fa/verify', { token: token });
        }

        return this.proxySecured.get('/2fa');
    }
}

const api = new Api();
export { api };
