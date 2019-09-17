#!/bin/sh

set -e

# derive API_HOST
# https://stackoverflow.com/questions/2497215/extract-domain-name-from-url#comment80168192_11385736
export API_HOST=$(echo $API_BASE_URL | awk -F/ '{print $3}')
# inject into the nginx configuration
envsubst '${API_HOST}' < /tmp/nginx.template.conf > /etc/nginx/nginx.conf

nginx
