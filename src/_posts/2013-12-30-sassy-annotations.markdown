---
layout: post
title:  "Sassy Annotations"
date:   2013-12-27 20:04:14
author: Jason Doyle
categories: scss
image: /assets/images/articles/annotated.png
---


A custom mixin for displaying annotations with line pointers.
<a href="http://codepen.io/mackdoyle/pen/rOOEWG?editors=110" target="_blank">View on Codepen</a>

<div class="annotation-container">
  <div class="annotation-one down-right">
      <div class="endpoint"></div>
      <p>Annotations are created by applying the @annotation mixin within a selector and defining the pointer orientation.</p>
  </div>
  <div class="annotation-two up-right">
      <div class="endpoint"></div>
      <p>Possible pointer orientations are: left, left-up, up-left, up, up-right, right-up, right, right-down, down-right, down, down-left, left-down.</p>
  </div>
</div>
<div class="caption">Photo by <a href="https://1x.com/photo/23361/" target="_blank">Mikesi</a></div>

Ever since we learned how to <a href="http://css-tricks.com/animation-css-triangles-work/" target="_blank">draw a triangle with CSS</a>, designers have relied upon it for creating tooltips
to <span data-tooltip data-options="disable_for_touch:true" class="has-tip [tip-bottom]" title="Tooltips are awesome, you should totally use them!">annotate content</span>. This is a great hack and fits many situations. Sometimes, we need to move tooltips further out an away from the object they are annotating, however. Standard speech-bubble style tooltips need to be nestled next to what they are annotating to maintain context. To move them out, we need to replace the triangle with a line.

At first glance, doing this sounds simple enough but in practice things can get complicated fast. Once we move annotations further out, we have to consider larger areas of the layout and ensure we do not cover up other important elements. To do so, we will need finer grain control than simple relative positioning provides. We now need to consider distances on x and y axis. And once we do that, would the line now need to project up, down and to the right, left and up, etc?

In an attempt to provide a solution that can be crafted relatively as fast as styling a floated box and a triangle in a pseudo element, I created Sassy Annotations. As the name implies, they require Sass but
that's it. They do still make use of the <code>:before</code> and <code>:after</code> pseudo elements so they will fail on IE versions older than IE8.

### The HTML
To deploy a Sassy Annotation, we will add two HTML elements and small amount of CSS. First, create a block level element and apply a custom class named <code>.annotation-one</code> to it. Then add a child element and give it a class of <code>.endpoint</code>. Now, add your annotation text. You can stack as many annotations as you need and then position them when you apply the mixin. NOTE: If you need more space, annotation() optionally takes `box-width` and `box-height`. ex `annotation(x, y, box-width, box-height)`

Once you have an idea of the placement for a given annotation, you will need to add one of the twelve provided line-segment classes to the parent. For example, if the annotation is in the upper left of your layout, you might want to apply the <code>down-right</code> line segment to it.

{% highlight html %}
<!-- Annotation 1 -->
<div class="annotation-one down-right">
  <div class="endpoint"></div>
  <p>Annotations are created by simply calling the @annotation mixin within a selector and defining the pointer orientation.</p>
</div>
{% endhighlight %}

### The CSS
First include the annotation mixins into your Sass project. Next, create a style for our first annotation, <code>.annotation-one{}</code> and include the <code>annotation(x,y)</code> mixin as the style's only property. Pass an x and y value in each include to position the annotations.


{% highlight css %}
// Annotation Initialization
// --------------------------------------- 

.annotation-one {
  @include annotation(220, -80);
}

.annotation-two {
  @include annotation(505, 65);
}
{% endhighlight %}

The last thing we need to do it include the line-segment. Add a <code>.down-right{}</code> class to your project and include the <code>pointer("down-right")</code> mixin as its only property. After that you are done.

{% highlight css %}
// Pointer Lines
// --------------------------------------- 
.down-right {
  @include pointer("down-right");
}

.left-up {
  @include pointer("left-up");
}
{% endhighlight %}


<a href="gist.github.com" class="download-link">Grab the mixin.</a>


