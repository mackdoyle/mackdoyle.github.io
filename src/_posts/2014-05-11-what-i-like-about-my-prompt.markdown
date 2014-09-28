---
layout: post
title:  "What I like about my prompt setup (iTerm2/Z-Shell)"
date:   2014-5-11 20:00:00
author: Jason Doyle
categories: terminal, workflow
---

1. More control over command prompt. (Although I had a fairly pimped out bash prompt)
2. Syntax highlighting of ~$man~ pages, ~$sh~ commands, etc. And if your into ~vi, vim, nano~, they call all have language specific coloring.

3. Beyond tab completion, zsh has command suggestion. So you type ~$sudo taol -n 100 /var/log/mysql/error.log~ and it asks, ~"Did you mean $tail?"~. Hit ~"Y"~ and the command runs w/o having to retype it. AND this works for all installed packages. So install node.js, fat finger a~$node lirst~ command, and it corrects it.

4. Plugins!!! You have to install Oh My Zsh to make zsh really stand out over bash. take look at all the prebuilt plugins you can add to it. Good stuff there: [https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins]
	Some simple examples are ~$jump~ that you can use to book mark directories and say ~$jump utilities~ and it takes you to ~/Applications/Utilities~. Or more advanced plugins that contain powerful Git scripts. Ruby, Python, Heroku, Django, it all there.

	A plugin for AWS was committed with positive feedback to expect it to be in the next release but there are several on GitHub you can add manually now. ex. grebburek / awe-scripts

5. User profiles in iTerm. With iTerm you can create multiple profiles define how they open when you launch your prompt. For example, I have one that loads into a web project and shows some Git stats, and another that loads in a subdued color scheme and fires off a $tail on some error logs.

##Configuration
1. Install iTerm
2. Install zsh
	1. CD to your user directory
	2. Get autoconf if you don't have it: $git clone git://git.sv.gnu.org/autoconf
	3. Get zsh:  $git clone git://git.code.sf.net/p/zsh/code zsh
	4. Run `$~/zsh/Ultil/preconfig`
	5. Open up Users and Group, unlock it and ctrl-click on your profile to get to the Advance Options.
	6. Set your Login Shell to: `exec zsh`
	7. If you hate it, set it back to: `exec bash`


