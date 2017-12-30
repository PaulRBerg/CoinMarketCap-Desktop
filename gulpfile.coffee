# Set env variables
dotenv = require 'dotenv'
dotenv.config()

# Import tasks
gulp = require 'gulp'
requireDir = require 'require-dir'
requireDir './tasks'
