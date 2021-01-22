#!/usr/bin/env bash
set -e

# update instance
yum -y update

# add nodejs to yum
curl -sL https://rpm.nodesource.com/setup_12.x | bash -

# install nodejs
yum -y install nodejs

# build tools
# echo "build tools"
# yum install gcc-c++ make

# install pm2 module globaly
sudo npm install pm2@latest -g
pm2 update