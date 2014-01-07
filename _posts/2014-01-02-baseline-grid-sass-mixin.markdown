---
layout: post
title:  "Baseline Grid Sass Mixin"
date:   2014-01-02 20:00:00
author: Jason Doyle
image: /assets/images/articles/baseline-grid.png
categories: css
---


 Using a baseline grid to set type is a must if you want to achieve vertical rhythm. Dan Eden & Michael Wright created [basehold.it][1], a dead simple solution that adds a baseline grid to an element's background. All you need to do is add a background-image property and point it to their URL.

 I wanted to additionally control the background-position so I created a little mixin. The [basehold.it][1] website has a very nifty feature that hides the grid by clicking anywhere within the element. It's such a simple and useful feature that I peed my pants a little the first time I used it. So that's in here as well.

Nothing groundbreaking, but something everyone needs to have in their library. So here you go. Or grab the gist with extended features <a href="https://gist.github.com/mackdoyle/8277070" target="_blank">here</a>.

{% highlight scss %}
	// _baseline-it.scss
    @mixin baseline-it($height:24, $red:0, $green:0, $blue:0, $offset:0) {
    	background-image: url('http://basehold.it/i/'+$height+'/'+$red+'/'+$green+'/'+$blue+''); 
    	
	// baseline grid at 36px with RGB colored lines
    background-position-y: $offset * 1px;
    	&:active{
        	background-image: inherit;
      	}
    }
{% endhighlight %}

Don't forget to import the mixin partial
{% highlight scss %}
	//global.scss
    @import "baseline-it";
{% endhighlight %}
  
Now include the mixin in your selector:
{% highlight css %}
	//layout.scss
    .container{
    	@include baseline-it(36, 50, 20, 20, 15);
    }
{% endhighlight %}

<div class="post-note"><i class="icon-entypo-circled-info">&nbsp;</i>Click and hold anywhere on the page</div>

[1]:	http://basehold.it