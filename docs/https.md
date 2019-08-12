# Instructions on running eapp over SSL – for local development only

1. Configure the api server to use SSL: 

    1. Generate SSL key/cert: 
        `openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out api/eapp_tls.crt -keyout api/eapp_tls.key`
    2. set TLS_CERT and TLS_KEY accordingly in .env

2. Configure nginx to serve the front end using SSL:
    1. `cp api/eapp_tls.* conf/ssl/`
    2. Modify the `server` block in `conf/nginx.template.conf` per http://nginx.org/en/docs/http/configuring_https_servers.html
        * `listen   8080 ssl;`
        * `ssl_certificate     /etc/ssl/eapp_tls.crt;`
        * `ssl_certificate_key /etc/ssl/eapp_tls.key;`

3. `make run`
