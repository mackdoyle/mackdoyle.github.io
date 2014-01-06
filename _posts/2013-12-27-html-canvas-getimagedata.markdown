---
layout: post
title:  "HTML Canvas getImageData()"
date:   2013-12-27 20:04:14
author: Jason Doyle
image: /assets/images/articles/pixel-detection.png
categories: [css, javascript]
---

  For my Sassy Annotations mixin, I wanted to color them the inverse of the image that sat upon. To accomplish this I
  would need to find a way to access the pixel data of the image, get the average color value and set the annotations
  to the inverse of that value.

  I knew to start looking at the HTML5 Canvas for the solution but I had a chance to play with it. So here is what I
  came up with. It demonstrates how to use the getImageData() method for opbtaining image imformation as well as how
  to deal with support for remotely hosted images using CORS.

  {% highlight javascript %}

    (function(jQuery, document, undefined) {
        var canvas = document.getElementById("target");
        var context = canvas.getContext('2d');

        var img = document.createElement('img');
        img.onload = function(e) {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          var url = canvas.toDataURL(); // Succeeds. Canvas won't be dirty.
        };

        img.crossOrigin = 'anonymous';
        img.src = 'http://diveintohtml5.info/i/openclipart.org_media_files_johnny_automatic_1360.png';
    })(jQuery, document);

  {% endhighlight %}

  {% highlight html %}
  <canvas id="target" width="1024" height="880">You're missing the rodeo. Get a modern browser.</canvas>
  {% endhighlight %}

