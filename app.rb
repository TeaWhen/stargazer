require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'httparty'
require 'haml'

configure do
  set :client_id, ENV["STARGAZER_CLIENT_ID"]
  set :client_secret, ENV["STARGAZER_CLIENT_SECRET"]
end

get '/login/?' do
  redirect "https://github.com/login/oauth/authorize?client_id=#{settings.client_id}&redirect_uri=http://127.0.0.1:9393/auth_github/&scope=user:follow"
end

get '/auth_github/?' do
  resp = HTTParty.post("https://github.com/login/oauth/access_token?client_id=#{settings.client_id}&client_secret=#{settings.client_secret}&code=#{params[:code]}")
  return "#{resp.body}"
end
