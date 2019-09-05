# Multiple hosts in local development

To mimic production in having the various services served from different hostnames, do the following:

1. Add the subdomains.

    ```sh
    sudo sh -c 'echo "127.0.0.1\tapi.eapp.local.test web.eapp.local.test" >> /etc/hosts'
    ```

1. If using [SAML](saml.md), modify the Service Provider to use a `Assertion Consumer URL` of `http://api.eapp.local.test:3000/auth/saml/callback`.
1. [Start the server.](../README.md#running-a-local-server)
1. Visit the site at <http://web.eapp.local.test:8080>.
