# Demo Oauth2 JS client

## Intro

This script is an example to how to make Oauth 2.0 authorization code grant type login.

## Install

Git clone then

```
cd demo-oauth-client-js
bower install
cp dist.config.php config.php
cp js/dist.client.js js/client.js
```

and update configuration settings in `config.php` and `js/config.js` with your oauth 2 server params.

## Usage

Navigate from browser to `index.html` and click *Connect*

## Note

Technically `proxy.php` is not required. But it's there to improve security since security credentials stay on the server side in `config.php`.