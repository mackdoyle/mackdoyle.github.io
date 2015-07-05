---
layout: post
title:  "What I like about my prompt"
date:   2014-5-11 20:00:00
author: Jason Doyle
categories: terminal, workflow
image: assets/images/articles/prompt.png
---

I have a little bit of an addiction to pimping out my development environment and nothing allows me to feed that addiction more than my terminal.
The brilliant minds that are part of the open source community are constantly creating great new solutions and refining old ones. It's a place that
offers endless possibilities for modification.

If you are just starting out, it can be a bit daunting so I thought I would throw together a short crash course that will have you working in style in no time.

First things first, I develop mainly for the web and work on a Mac so this will be mostly relevant for that environment. If you don't have a Mac, and you
can afford one, stop what you are doing and go buy one. Everything else in this article is just an opinion, web development on a Mac is not. Seriously, I
cannot believe I spent 12 of my 17 years as web developer on Windows.

Ok, enough of that. What we will be doing is installing a better terminal emulator, a new shell and a few other things that will make your terminal experience
more enjoyable, and most importantly, more efficient.

##The Terminal Emulator
iTerm2 is a powerful replacement to the default Terminal app that come on OS X. Some advantages of iTerm2 are:
1. tmux integration. This allows you to have multiple virtual windows open in a single terminal.
2. Better color support. iTerm supports 256 color modes, which we will use later
3. Arrangements. You can configure iTerm2 how you like it, including its location on your desktop, and save it for various situations.
4. Highly configurable. iTerm2 has a rich preferences section so you can get it jus the way you want it.

Go ahead and download iTerm2 here: <a href="http://iterm2.com/">iTerm2</a>

##zsh shell and oh-my-zsh

1. More control over command prompt.
2. Syntax highlighting of ~$man~ pages, ~$sh~ commands, etc. And if your into ~vi, vim, nano~, they call all have language specific coloring.

3. Beyond tab completion, zsh has command suggestion. So you type ~$sudo taol -n 100 /var/log/mysql/error.log~ and it asks, ~"Did you mean $tail?"~. Hit ~"Y"~ and the command runs w/o having to retype it. AND this works for all installed packages. So install node.js, fat finger a~$node lirst~ command, and it corrects it.

4. Plugins!!! You have to install Oh My Zsh to make zsh really stand out over bash. take look at all the prebuilt plugins you can add to it. Good stuff there: [https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins]
	Some simple examples are ~$jump~ that you can use to book mark directories and say ~$jump utilities~ and it takes you to ~/Applications/Utilities~. Or more advanced plugins that contain powerful Git scripts. Ruby, Python, Heroku, Django, it all there.

	A plugin for AWS was committed with positive feedback to expect it to be in the next release but there are several on GitHub you can add manually now. ex. grebburek / awe-scripts

5. User profiles in iTerm. With iTerm you can create multiple profiles define how they open when you launch your prompt. For example, I have one that loads into a web project and shows some Git stats, and another that loads in a subdued color scheme and fires off a $tail on some error logs.

2. Install zsh
	1. CD to your user directory
	2. Get autoconf if you don't have it: $git clone git://git.sv.gnu.org/autoconf
	3. Get zsh:  $git clone git://git.code.sf.net/p/zsh/code zsh
	4. Run `$~/zsh/Ultil/preconfig`
	5. Open up Users and Group, unlock it and ctrl-click on your profile to get to the Advance Options.
	6. Set your Login Shell to: `exec zsh`
	7. If you hate it, set it back to: `exec bash`


