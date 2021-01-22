#!/usr/bin/env bash
set -e

# update instance
echo "update instance"
yum -y update

# add nodejs to yum
echo "add nodejs to yum"
curl -sL https://rpm.nodesource.com/setup_12.x | bash -

# install nodejs
echo "install nodejs"
yum -y install nodejs

# build tools
echo "build tools"
yum install gcc-c++ make

# install pm2 module globaly
echo "install pm2 module globaly"
sudo npm install pm2@latest -g
pm2 update