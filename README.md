# Stargazer

GitHub star management, on web.

## Front-end

1. Install `node`
2. `npm install -g bower gulp`
3. `npm install` and `bower install`
4. `gulp`

## Backend

First, set these env vars.
```bash
export STARGAZER_CLIENT_ID={github_client_id}
export STARGAZER_CLIENT_SECRET={github_client_secret}
export STARGAZER_COOKIE_SECRET={cookie_salt}
export COUCHDB_ADMIN_PASSWORD={couchdb_admin_password}
```

1. Install CouchDB, and setup an admin with name 'starwarden', use the password in env vars.
2. Install redis.
3. `bundle`
4. Setup meta db with `ruby bootstrap.rb`
5. cd into the `redis` subdir and `redis-server redis.conf`
6. Fire up sidekiq with `sidekiq -r ./app.rb`
7. Fire up server with `shotgun`
8. http://127.0.0.1:9393/login and wait
9. `couchdb`

## Enabling CORS

To replicate directly with CouchDB, you need to make sure CORS is enabled. Only set the username and password if you have set them previously. By default, CouchDB will be installed in "Admin Party," where username and password are not needed. You will need to replace myname.iriscouch.com with your own host (127.0.0.1:5984 if installed locally):

```bash
$ export HOST=http://starwarden:password@127.0.0.1:5984
$ curl -X PUT $HOST/_config/httpd/enable_cors -d '"true"'
$ curl -X PUT $HOST/_config/cors/origins -d '"*"'
$ curl -X PUT $HOST/_config/cors/credentials -d '"true"'
$ curl -X PUT $HOST/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
$ curl -X PUT $HOST/_config/cors/headers -d \
  '"accept, authorization, content-type, origin"'
```
