---
layout: post
title:  "Sassy Annotations"
date:   2013-12-27 20:04:14
author: Jason Doyle
categories: css
---

<div class="article-hero">
  <img style="margin-bottom:26px" src="/assets/images/articles/annotations.png" onerror="this.onerror=null; this.src='assets/images/articles/annotations.png'">
</div>

<div class="article-content">
  A custom mixin for displaying annotations with line pointers.
  <a href="#" data-reveal-id="annotationModal">View Demo</a>

  Ever since we learned how to <a href="" target="_blank">draw a triangle with CSS</a>, designers have relied upon it for creating tooltips
  to <span class="tooltip">annotate content</span>. This was a great discovery and has its place but, but isn't applicable to all situations.
  The problem appears when tooltips need to stay out of the way of the content they are annotating. Standard speech-bubble-style
  tooltips need to be nestled next to what they are annotating to maintain context. Moving them out a bit means replacing the beloved css triangle
  pointer with a line.

  At first glance, doing this sounds simple enough but in practice things can get complicated fast. For example, a typical use
  case for this typically involves the need to add annotations on top of their context rather than adjacent to. This means the typical approach of
  relative positioning has to be replaced with more verbose x,y positioning.

  In an attempt to provide a solution for these less-than-edge-cases, I created Sassy Annotations. As the name implies, they require Sass (Scss) but
  that's it. They do use the :before and :after pseudo elements which means they will work in IE 8+.

  To deploy a Sassy Annotation, you only need to a two HTML elements and small amount of CSS to position it.

  {% highlight html %}
    <div class="annotation-one down-right">
  			<div class="endpoint"></div>
  			<p>Annotations are created by simply calling the @annotation mixin within a selector and defining the pointer orientation.</p>
  		</div>
  {% endhighlight %}



  <div id="annotationModal" class="reveal-modal" data-reveal>
    <p data-height="1200" data-theme-id="0" data-slug-hash="dayFB" data-user="mackdoyle" data-default-tab="result" class='codepen'>
      See the Pen <a href='http://codepen.io/mackdoyle/pen/dayFB'>Annotations</a> by mackdoyle (<a href='http://codepen.io/mackdoyle'>@mackdoyle</a>) on <a href='http://codepen.io'>CodePen</a>
    </p>
    <script src="//codepen.io/assets/embed/ei.js"></script>
    <a class="close-reveal-modal">&#215;</a>
  </div>
</div>