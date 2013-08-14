# Clockz.js - <a href="http://oOthkOo.github.io/clockz.js" target="_blank">Demo</a>
Clockz is a Super-smooth Frame Animation manager to help you manage multiples animations in same time.
Usage
-----

Just include this script after jQuery. Requires jQuery 1.4+.

``` html
<script src='js/jquery.js'></script>
<script src='js/clockz.js'></script>
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
