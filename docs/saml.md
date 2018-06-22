# SAML

To authenticate with SAML rather than the basic auth:

1. Create the Identity Server image. Options:
    * [Build from scratch](https://github.com/wso2/docker-is/tree/master/dockerfiles/is)
    * Download the existing image (GSA only) <!-- because we don't have a registry -->
        1. [Download the image](https://drive.google.com/file/d/1o7aP98rhoGPL5PEZALnXNnQfWxqfRyJi/view?usp=sharing)
        1. Unarchive and load the image.

            ```shell
            gunzip wso2-image.tar.gz
            docker load -i wso2-image.tar
            ```

1. Start the Identity Server.

    ```shell
    make identity
    ```

1. Set up SAML Provider.
    1. [Visit WSO2 console.](https://localhost:9443/carbon)
    1. Click through the certificate warning in your browser.
    1. Log in with username and password of `admin`.
    1. [Add a Service Provider](https://localhost:9443/carbon/application/add-service-provider.jsp) with the Name `localhost`.
    1. Go into the `Inbound Authentication Configuration`->`SAML2 Web SSO Configuration` section, then click `Configure`.
    1. Fill out the form.
        - Issuer: `localhost`
        - Assertion Consumer URLs: `http://localhost:3000/auth/saml/callback`, then click `Add` <!-- this should match SAML_CONSUMER_SERVICE_URL -->
        - Uncheck everything but `Enable Response Signing`
1. Copy the certificate.
    1. [Go to `Identity Providers`->`Resident`.](https://localhost:9443/carbon/idpmgt/idp-mgt-edit-local.jsp)
    1. Expand `Inbound Authentication Configuration`, then `SAML2 Web SSO Configuration`.
    1. Click `Download SAML Metadata`.
    1. Open up the resulting SAML Metadata XML file that gets downloaded, and copy the contents of the `<X509Certificate>` element.
    1. Save that in `api/wso2.crt`.

        ```
        -----BEGIN CERTIFICATE-----
        <contents>
        -----END CERTIFICATE-----
        ```

1. Enable SAML on the "client" side.
    1. In your `.env`, set `BASIC_ENABLED=` and `SAML_ENABLED=1`.
1. In another terminal, start the server (or restart, if already running).

    ```shell
    make run
    ```

1. Visit [http://localhost:8080](http://localhost:8080).
1. `Log in with PIV/CAC`, with username and password of `admin`.
