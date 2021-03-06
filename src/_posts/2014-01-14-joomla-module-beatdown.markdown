---
layout: post
title:  "Joomla Module Beatdown"
subtitle:  "Understanding the Display of Joomla Modules"
date:   2014-01-14 20:00:00
author: Jason Doyle
categories: joomla, cms, php
image: assets/images/articles/cubism.png
---


One of the quirks of Joomla that can really cause you to tear your hair out, is the seemingly random display (or refusal to display) of modules on certain pages. One of the more common places this can occur is on search results pages. To avoid the problem, you must first understand the central roll menus, and their underlying ItemID, play in defining context for Joomla pages.

When a menu item is created, it is assigned an ID. This ID is appended, as the ItemID, to any page accessed via the menu item and is used by Joomla to persist the menu item’s settings to those pages. When you set the visibility of a module from within the module settings, you are basically saying, “show this module for the following ItemIDs.”

This is an efficient approach to managing an _n_ number of modules on an _n_ number of pages but it can also cause problems that are difficult to troubleshoot. Almost every website will have pages that are not directly linked from a menu. Articles linked only from other articles or linked images in custom modules are examples of these. Since the pages are not associated with a menu item, they have no ItemID, and no way for Joomla to properly manage what modules are visible or hidden for it. Going back to the early days of Joomla, the official solution has been to create a seperate menu for managing these pages. The idea is to create a menu that you never actually show on the front end. Then add a menu item for any page that needs an ItemID.  You can then control the display of modules in the Modules Assignments tab like normal.

It’s a hack, and it leaves a little distaste in your mouth, but it does work well. That is for everything except search results pages…

The search results page is a bit of a special case in that, if it has no ItemID of its own, it assumes the ItemID of the page that referred it. This generally goes unnoticed until a search is performed from a page that contains modules you do not want on the search results page. The home page is a good example, which may contain a slider module and other single page use modules. You can see this yourself by looking at the URL after performing a search from your home page. You will see something similar to '/search/?searchphrase=all&Itemid=122'. Take note of the ItemID and head over to the Menu Manager for the menu that contains your home page menu item. Look in the ID column of the home page menu item and you will see it matches the ItemID used on the search results page.

[Joomla ItemID]({{ site.url }}/assets/images/articles/joomla-itemid-compare.png)

Now browse to another page that has a different module arrangement. Replace the ItemID in the URL on that page with the one for your home page.

Refresh that page and you should see that the page now has the module layout of your home page. (Note: This will only work if you are not using any type of URL rewriting). To learn more about the ItemID, take a look at this old but still relevant article: [http://documentation.hwdmediashare.co.uk/wiki/The\_Joomla\_Itemid\_Explained]. Another good read can be found here: [http://www.itoctopus.com/what-is-itemid-in-a-joomla-url-and-why-it-is-important-to-have-it]

Relevant to: Joomla 2.5-3x

####Update:####
Since the writing of this article, a similar one has shown up on Joomla.org that provides some additional information. take a look here:
[https://docs.joomla.org/How_to_control_module_display_when_linking_to_an_article_with_no_menu_item](https://docs.joomla.org/How_to_control_module_display_when_linking_to_an_article_with_no_menu_item)
