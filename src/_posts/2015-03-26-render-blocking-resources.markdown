---
layout: post
title:  "How to Deal with Render Blocking Resources"
date:   2015-03-26 20:00:00
author: Jason Doyle
categories: workflow
image: assets/images/articles/render-blocking-resources.png
---

All modern browsers hold page rendering until it looks up the media tree view of a stylesheet, initiates the stylesheet load and finally contracts the CSS Object Model. This is why CSS is known as a render blocking resource. So we need to do everything we can to optimize this process. The two standard techniques are to always use media types and media queries. Media types tell the browser to only load the css under certain conditions. For example, print styles sheets should have media=“print” applied to them.

##Asynchronously loading CSS
It’s possible to exploit the conditional nature of the media type and trick the browser into releasing the render block. This opens up the ability to load CSS asynchronously. All you need to do is set the media type to a condition that will never be met. This will prevent the stylesheet from loading but will instruct the browser to begin rendering the page. You can then inject the CSS into the page using Javascript.

The Filament Group created a library that does exactly this. The library is very small so I suggest checking it out before you try to build something on your own.

[https://github.com/filamentgroup/loadCSS](https://github.com/filamentgroup/loadCSS)

##Asynchronous Javascript
Loading external javascript files can create the same render blocking issues as CSS. Traditionally, you see js files loaded like this:

{% highlight Javascript %}
<script src="//host.com/script.js"></script>
{% endhighlight %}

There have been multiple methods suggested to get this js to load asynchronously but they typically cause more harm then good. Generally issues appear due to the relationship the browser puts on CSS and JS. Specifically, browsers will not execute javascript until the CSSOM has loaded. There is correct way to handle this, though, and it is as simple as adding the async attribute to the script tag.

{% highlight Javascript %}
<script src="//host.com/script.js" async></script>
{% endhighlight %}

