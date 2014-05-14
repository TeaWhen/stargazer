require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'unirest'
require 'sidekiq'
require 'sidekiq/api'
require 'octokit'
require 'sinatra/cookies'
require 'json'
require 'pry'

Sidekiq.configure_server do |config|
  config.redis = { :url => 'redis://127.0.0.1:7227', :namespace => 'stargazer' }
end

Sidekiq.configure_client do |config|
  config.redis = { :url => 'redis://127.0.0.1:7227', :namespace => 'stargazer' }
end

class StarredRepoDownloader
  include Sidekiq::Worker

  def perform(access_token)
    client = Octokit::Client.new(access_token: access_token)
    client.auto_paginate = true
    user = client.user
    stars = client.starred
    stars.each do |star_repo|
      data = star_repo.to_hash.select{ |k, v| [:id,:name,:full_name,:html_url,:description,:stargazers_count,:language,:forks_count].include? k }
      Unirest.put "http://127.0.0.1:5984/#{user.login.downcase}/#{data[:id]}",
        auth: { user: user.login, password: access_token},
        parameters: data.to_json
    end
    r = Unirest.get "http://127.0.0.1:5984/stargazer_meta/#{user.login}",
      auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]}
    Unirest.put "http://127.0.0.1:5984/stargazer_meta/#{user.login}",
      auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]},
      parameters: {downloaded: true, _rev: r.body["_rev"]}.to_json
  end
end

configure do
  set :client_id, ENV["STARGAZER_CLIENT_ID"]
  set :client_secret, ENV["STARGAZER_CLIENT_SECRET"]

  use Rack::Session::Cookie, :secret => ENV["STARGAZER_COOKIE_SECRET"]
end

helpers do
  def check_login
    unless cookies[:atk]
      redirect '/login/'
    end
    client = Octokit::Client.new(access_token: cookies[:atk])
    begin
      user = client.user
    rescue
      user = nil
    end
    unless user
      redirect '/login/'
    end
    return client
  end
end

get '/login/?' do
  # binding.pry
  # unless cookies[:atk]
    redirect "https://github.com/login/oauth/authorize?client_id=#{settings.client_id}&redirect_uri=http://127.0.0.1:9393/auth_github/&scope=user:follow"
  # else
  #   redirect "/u"
  # end
end

get '/auth_github/?' do
  resp = Unirest.post "https://github.com/login/oauth/access_token?client_id=#{settings.client_id}&client_secret=#{settings.client_secret}&code=#{params[:code]}",
    headers:{ "Accept" => "application/json" }
  cookies[:atk] = resp.body["access_token"]
  client = check_login
  user = client.user
  Unirest.put "http://127.0.0.1:5984/#{user.login.downcase}",
    auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]}
  Unirest.put "http://127.0.0.1:5984/_users/org.couchdb.user:#{user.login}",
    auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]},
    parameters: {name: user.login, password: cookies[:atk], roles: [], type: "user"}.to_json
  Unirest.put "http://127.0.0.1:5984/#{user.login.downcase}/_security",
    auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]},
    parameters: {admins: {names: [], roles: []}, members: {names: [user.login], roles:[] }}.to_json
  Unirest.put "http://127.0.0.1:5984/stargazer_meta/#{user.login}",
    auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]},
    parameters: {downloaded: false}.to_json
  StarredRepoDownloader.perform_async cookies[:atk]
  redirect '/u'
end

get '/u/?' do
  client = check_login
  user = client
  resp = Unirest.get "http://127.0.0.1:5984/stargazer_meta/#{user.login}",
    auth: { user: "starwarden", password: ENV["COUCHDB_ADMIN_PASSWORD"]}
  if resp.body["downloaded"]
    return "done."
  else
    return "not done."
  end
end
