# encoding: utf-8

require 'rubygems'
require 'bundler/setup'
require 'sinatra'

set :environment, :production
disable :run, :reload

require './app'
run Sinatra::Application
