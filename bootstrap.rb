require 'unirest'

# Create admin user

# Create meta db
Unirest.put "http://127.0.0.1:5984/stargazer_meta",
  auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]}
# Set _security
sec_rules = {admins: {names: [], roles: []}, members: {names: [], roles:["_admin"] }}
Unirest.put "http://127.0.0.1:5984/stargazer_meta/_security",
  auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]},
  parameters:sec_rules.to_json
