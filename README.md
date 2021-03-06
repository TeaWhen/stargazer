# Stargazer

GitHub star management, on web.

## Setup

### Front-end

1. Install `node`
2. `npm install -g bower gulp`
3. `npm install` and `bower install`
4. `gulp`

### Backend

First, set these env vars.
```bash
export STARGAZER_CLIENT_ID={github_client_id}
export STARGAZER_CLIENT_SECRET={github_client_secret}
export STARGAZER_COOKIE_SECRET={cookie_salt}
export COUCHDB_ADMIN_PASSWORD={couchdb_admin_password}
```

0. Setup front-end first
0. Install and startup CouchDB, and setup an admin with name **starwarden**, use the password in env vars.
0. Install redis
0. Install rvm and use rvm’s ruby
0. `bundle`
0. Setup meta db with `ruby bootstrap.rb`
0. cd into the `redis` subdir and `redis-server redis.conf`
0. Fire up sidekiq with `sidekiq -r ./app.rb`
0. Fire up server with `shotgun`
0. http://127.0.0.1:9393/

### Enabling CORS

To replicate directly with CouchDB, you need to make sure CORS is enabled.

```bash
export HOST=http://starwarden:password@127.0.0.1:5984
curl -X PUT $HOST/_config/httpd/enable_cors -d '"true"'
curl -X PUT $HOST/_config/cors/origins -d '"*"'
curl -X PUT $HOST/_config/cors/credentials -d '"true"'
curl -X PUT $HOST/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl -X PUT $HOST/_config/cors/headers -d \
'"accept, authorization, content-type, origin"'
```
