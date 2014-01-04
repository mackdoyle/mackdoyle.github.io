---
layout: post
title:  "Sassy Annotations"
date:   2013-12-27 20:04:14
author: Jason Doyle
categories: css
---

A custom mixin for displaying annotations with line pointers

Features:
- line segment pointers
- light HTML markup

Take a quick look at is before we break it down...
<p data-height="1200" data-theme-id="0" data-slug-hash="dayFB" data-user="mackdoyle" data-default-tab="result" class='codepen'>
  See the Pen <a href='http://codepen.io/mackdoyle/pen/dayFB'>Annotations</a> by mackdoyle (<a href='http://codepen.io/mackdoyle'>@mackdoyle</a>) on <a href='http://codepen.io'>CodePen</a>
</p>
<script src="//codepen.io/assets/embed/ei.js"></script>

<a href="#" data-reveal-id="inPostModal" class="more">View Demo</a>

{% highlight html %}
  <div class="annotation-one down-right">
			<div class="endpoint"></div>
			<p>Annotations are created by simply calling the @annotation mixin within a selector and defining the pointer orientation.</p>
		</div>
{% endhighlight %}


