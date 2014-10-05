---
layout: post
title:  "Joomla Module Beatdown"
subtitle:  "Understanding the Display of Joomla Modules"
date:   2014-01-14 20:00:00
author: Jason Doyle
categories: joomla, cms, php
image: assets/images/bkgs/sm/phone.jpg
---


One of the quirks of Joomla that can really cause you to tear your hair out, is the seemingly random display (or refusal to display) of modules on certain pages. One of the more common places this can occur is on search results pages. To avoid the problem, you must first understand the central roll menus, and their underlying ItemID, play in defining context for Joomla pages.

When a menu item is created, it is assigned an ID. This ID is appended, as the ItemID, to any page accessed via the menu item and is used by Joomla to persist the menu item’s settings to those pages. When you set the visibility of a module from within the module settings, you are basically saying, “show this module for the following ItemIDs.”

This is an efficient approach to managing an _n_ number of modules on an _n_ number of pages but it can also cause problems that are difficult to troubleshoot. Almost every website will have pages that are not directly linked from a menu. Articles linked only from other articles or linked images in custom modules are examples of these. Since the pages are not associated with a menu item, they have no ItemID, and no way for Joomla to properly manage what modules are visible or hidden for it. Going back to the early days of Joomla, the official solution has been to create a seperate menu for managing these pages. The idea is to create a menu that you never actually show on the front end. Then add a menu item for any page that needs an ItemID.  You can then control the display of modules in the Modules Assignments tab like normal.

It’s a hack, and it leaves a little distaste in your mouth, but it does work well. That is for everything except search results pages…

The search results page is a bit of a special case in that, if it has no ItemID of its own, it assumes the ItemID of the page that referred it. This generally goes unnoticed until a search is performed from a page that contains modules you do not want on the search results page. The home page is a good example, which may contain a slider module and other single page use modules. You can see this yourself by looking at the URL after performing a search from your home page. You will see something similar to ~/search?q=odds&Itemid=435~. Take note of the ItemID and head over to the Menu Manager for the menu that contain the reference to your home page.  Look in the ID column of the home page menu item and you will see it matches the ItemID.


Manually setting the ItemID on the search.


