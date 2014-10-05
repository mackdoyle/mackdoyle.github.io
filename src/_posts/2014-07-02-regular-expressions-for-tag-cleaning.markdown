---
layout: post
title:  "Regular Expressions for Cleaning Markup"
date:   2014-07-02 20:00:00
author: Jason Doyle
categories: workflow
image: assets/images/bkgs/sm/blurred-head.jpg
---


Every web developer finds themselves having to clean up and manipulate tags and Search and Replace can only take you
so far. Here are a few I use that save me hours.

Nothing beats BBEdit/Text Wrangler for tasks like this. So save these in the reg-ex library if you use those tools.
Coda and Sublime fans can save these as snippets.

1. Replace tag attributes.
Usage: When you want to strip out the attributes for a certain tag but said tags have
different attributes. This is also useful when you need to strip out tags with various attributes.

{% highlight Python %}
# Find
<p([^>]*)>

# Replace
<p>
{% endhighlight %}

2. Repalce open and closing tags

{% highlight Python %}
# Find
<(/?)b>

# Replace
<\1strong>
{% endhighlight %}

3. Match all instances of a tag regardless of each tag's attributes

{% highlight Python %}
# Find
\<img(.*)\>
{% endhighlight %}
