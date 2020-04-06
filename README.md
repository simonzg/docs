# Meter Docs

This is the documentation project for meter.io

# Build

## Install Ruby & Gem

```
sudo apt update
sudo apt install ruby-full ruby-dev
```

## Install bundler

```
gem install bundler -v 1.15
```

## Clone the project & build

```
git clone https://github.com/xiaohanzhu/docs
bundle _1.15_ install
source ./build.sh
```

# Deploy

The `build` directory contains all the compiled resources. If you are using nginx, you could config it to interpret the directory as is.