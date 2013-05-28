# [clockz.js](http://htmlpreview.github.io/?https://github.com/oOthkOo/clockz.js/blob/master/clockz.html)
#### Super-smooth Frame Animation Manager

Clockz is a manager for to help you do multiples animations.

Usage
-----

Just include this script after jQuery. Requires jQuery 1.4+.

``` html
<script src='jquery.js'></script>
<script src='clockz.js'></script>
```

Example
-----

``` html
<script>
$(function () {
  			
	console.log( 'jquery: ' + $().jquery );
	console.log( 'clockz: ' + clockz.version );

	var anim1 = {
		name: 'anim1',
		loop: true,
		loopStart: 1,
		loopEnd: 2,
		loopRepeat: 5,
		frames: [
			{
				properties: { left: 300, opacity: 0.2, width: 200, height: 200 },
				duration: 1000,
				easing: 'swing'
			},
			{
				properties: { top: 300,	opacity: 1 },
				duration: 1000,
				easing: 'swing'
			},
			{
				properties: { top: 10, left: 10, width: 150, height: 150 },
				duration: 1000,
				easing: 'swing'
			}
		]					
	};

	var anim2 = {
		name: 'anim2',
		loop: true,
		frames: [
			{
				properties: { top: 300 },
				duration: 2000,
				easing: 'swing'
			},
			{
				type: 'transit',
				properties: { rotate: '+=30', },
				duration: 400,
				easing: 'fast'
			},
			{
				properties: { left: 500, opacity: 0.2 },
				duration: 1000,
				easing: 'swing'
			},
			{
				type: 'transit',
				properties: { rotate: '+=30' },
				duration: 400,
				easing: 'fast'
			},
			{
				properties: { top: 10, left: 10, opacity: 1 },
				duration: 1000,
				easing: 'swing'
			}
		]					
	};
					
	clockz.playHook = function(node, frame, callback) {
		
		var easing = frame.easing || 'swing';
		var duration = frame.duration || 400;
		var type = frame.type || 'jquery';
		
		switch (type) {
			case 'jquery':
				$(node).animate(frame.properties, duration, easing, callback);
				break;
			case 'transit':
				$(node).transition($.extend({
										duration: duration,
										easing: easing,
										complete: callback
				}, frame.properties));
				break;
		}				
	}

	clockz.create('#block1', anim1);
	clockz.create('#block2', anim2);
	clockz.playAll();        
});
</script>

```
