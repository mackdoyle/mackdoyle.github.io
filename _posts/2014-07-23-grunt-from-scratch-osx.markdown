---
layout: post
title:  "Getting Grunt Up and Running in Your Local Dev (OS X)"
date:   2014-7-23 20:00:00
author: Jason Doyle
categories: workflow
---


There are a ton of getting started tutorials for Grunt but I want to document the steps that work for me. In future posts, i will be explaining and providing solutions for
some of the pain points you will encounter when working with popular Grunt tasks and this will serve as a good start to those as well.

##Part 1. Installing Node Package Manager (NPM)
Node Packet Manager (NPM) is package manger used by Node.js and is used to install Grunt, among other things. If you do not have NPM installed, follow these instructions. Otherwise, skip to Part 2.
*NPM is now bundled with Node.js and the best way to get it is by using Homebrew.

###Install Homebrew.
First check to see if Homebrew is already installed.
{% highlight python %}
  # Check is brew is installed
	type -a brew
{% endhighlight %}

If it is not, install it using the following commands:
{% highlight python %}
# Install the xCode command line tools
	xcode-select --install
	# Now install Homebrew
	ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
{% endhighlight %}

###Install Node.js and Node Packet Manager.
First check to see if NPM is already installed.
{% highlight python %}
# Check if Node Packet Manager is installed
	type -a npm
{% endhighlight %}

If NPM is not found, we assume node.js is also not installed and install it using the following commands:
{% highlight python %}
# Install Node (and npm)
	brew install node
	# Test that NPM is now installed
	npm -v
	# Note when installing packages using NPM that it has the concept of both local and global installations.
	# Global installations are saved into the /usr folder for use anywhere. Local installations are saved to the current directory for use with specific projects.
	# When installing a package, pass the -g argument to install a package globally.
{% endhighlight %}


##Part 2. Installing Grunt
You will first need to perform a one-time install of the Grunt Command Line Interface.
Install the Grunt Command Line Interface globally. (don’t forget the -g)
{% highlight python %}
	sudo npm install -g grunt-cli
{% endhighlight %}

Downlaod this Gruntfile into your projects root: https://gist.github.com/mackdoyle/1cfffdb1ac7ab59be9e6.
And this package.json: https://gist.github.com/mackdoyle/f646a27f7fbacc91766e.
Now simply run NPM install from the project root to use it.
The package.json is configured to tell NPM to install Grunt and the project’s Grunt dependencies.
{% highlight python %}
  cd /[site_path]/
	sudo npm install
{% endhighlight %}

Run Grunt
{% highlight python %}
# Change to the project root directory if not alreay there
	cd /[site_path]
	# Run Grunt from the project root to execute the contrib processes used in the project
	grunt
{% endhighlight %}


##About package.json
The package.json file defines the set of Grunt plugins (known as contribs) that are used in a project. When the `nmp install grunt --save-dev`
command is executed, nmp uses this file to determine which Grunt contribs to install locally in the `/node_modules`directory.

##About Grunt.js
The Grunt.js file is master configuration file for Grunt. It is where the settings for each individual contrib package is stored.
For example, if the project uses Uglify, it will first be defined in package.json as a devDependency so the contrib is installed locally.
There will then need to be an uglify section in Grunt.js that defines which .js files it should minify and in what order.
