# USPS Web Tools

eApp optionally uses the [United States Postal Service (USPS) Web Tools APIs](https://www.usps.com/business/web-tools-apis/welcome.htm) to verify address information.

To enable address validation:

1. [Register with the USPS](https://registration.shippingapis.com)
    * `@gsa.gov` email servers block the registration email sent by `registration@shippingapis.com`. It looks too much like spam and doesn't even make it to the spam folder. Try registering with an alternative email address if the registration email does not arrive within a few minutes.

1. Configure the Web Tools username 
    * In the `.env` file used to build eApp (or at runtime in the eApp API backend process environment), set the `USPS_API_API_KEY` environment variable to the value of the username (e.g., `USPS_API_API_KEY=123ABCDE4567`).
    
    
## Notes:

* The registration email will provide a username and a password. Only the username is required for the API used by eApp.

* The [Development Guide](https://www.usps.com/business/web-tools-apis/general-api-developer-guide.pdf) indicates that each website where eApp is deployed should have a unique API username. If username reuse is detected, the application could be subject to immediate loss of access to the USPS server.
