Stargazer
=========

GitHub star management, on web.

Front-end
---
0. Install ``node`` and ``bower``
1. ``npm install`` and ``bower install``
2. ``gulp``

## Backend

1. Set these env vars.
  ```
    export STARGAZER_CLIENT_ID={github_client_id}
    export STARGAZER_CLIENT_SECRET={github_client_secret}
    export STARGAZER_COOKIE_SECRET={cookie_salt}
    export COUCHDB_ADMIN_PASSWORD={couchdb_admin_password}
  ```
2. Install CouchDB, and setup an admin with name 'starwarden', use the password in env vars.
3. Install redis.
4. `bundle`
5. Setup meta db with `ruby bootstrap.rb`
6. cd into the `redis` subdir and `redis-server redis.conf`
7. Fire up sidekiq with `sidekiq -r ./app.rb`
8. Fire up server with `shotgun`
9. http://127.0.0.1:9393/login and wait
