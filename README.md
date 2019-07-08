# Clockz.js
[![SlugBay Badge](https://www.slugbay.com/pictures/badges/slugbay-simple.svg)](https://www.slugbay.com)

<a href="http://oOthkOo.github.io/clockz.js" target="_blank">Demo</a>
![Screenshot](https://raw.githubusercontent.com/oOthkOo/clockz.js/master/screenshots/clockz-001.png)

Clockz is a Super-smooth Frame Animation manager to help you manage multiples animations in same time.
Installation
-----
Just include this script after jQuery. Requires jQuery 1.4+.

```javascript
<script src='js/jquery.js'></script>
<script src='js/clockz.js'></script>
```
Animation
-----
This is how you can define a complex animation.

```javascript
var myAnim = {
	name: 'phone2',				// Animation name
	loop: true,					// looping ? (default: false)
	loopStart: 0,				// loop start frame index (default: 0)
	loopEnd: 3,					// loop end frame index
	frames: [
		{
			duration: 2000		// Frame duration, used without properties to pause
		},
		{
			type: 'jquery',		// Frame type, used for hook (default: jquery)
			properties: {		// Frame properties
				left: 410
			},
			duration: 800,		// Frame properties
			easing: 'swing'		// Frame easing
		}
	]					
};
```
Hook
-----
With a hook function, you can manage multiples animation frameworks like jQuery, Transit, Greensock and much mores.

```javascript
clockz.playHook = function(node, frame, callback) {
	var duration = frame.duration || 400;
	var properties = frame.properties || null;			
	if (properties) {
		var jnode = $(node); // node selector (ex: '.class','#id' etc..)
		if (!jnode) {
			this.error( 'playHook(): node is invalid.' );
			return;					
		}
		var type = frame.type || 'jquery';
		var easing = frame.easing || 'swing';				
		switch (type) {
			// handle jQuery frames
			case 'jquery':
	                	$(node).animate(properties, duration, easing, callback);
	                	break;
			// handle Transit frames
			case 'transit':
				$(node).transition($.extend({
					duration: duration,
					easing: easing,
					complete: callback
				}, properties));
				break;
			// handle Greensock frames
			case 'greensock':
				// ...
				break;
		}
	}
	else {
		setTimeout(callback, duration); // to pause animation when no frame properties found
	}               
};
```
Usage
-----
This is a complete example to see Clockz in action ;-)

```javascript
$(function () {

	// create a new clockz manager
	var clockz = new Clockz();

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

	// redefine a clockz hook function to manage
	// jQuery, Transit and Greensock animation frameworks				
	clockz.playHook = function(node, frame, callback) {
		var duration = frame.duration || 400;
		var properties = frame.properties || null;			
		if (properties) {
			var jnode = $(node); // node selector (ex: '.class','#id' etc..)
			if (!jnode) {
				this.error( 'playHook(): node is invalid.' );
				return;					
			}
			var type = frame.type || 'jquery';
			var easing = frame.easing || 'swing';				
			switch (type) {
				// handle jQuery frames
				case 'jquery':
		                	$(node).animate(properties, duration, easing, callback);
		                	break;
				// handle Transit frames
				case 'transit':
					$(node).transition($.extend({
						duration: duration,
						easing: easing,
						complete: callback
					}, properties));
					break;
				// handle Greensock frames
				case 'greensock':
					// ...
					break;
			}
		}
		else {
			setTimeout(callback, duration); // to pause animation when no frame properties found
		}               
	};

	clockz.create('#block1', anim1);	// link an anim1 with #block1
	clockz.create('#block2', anim2);	// link an anim2 with #block2
	clockz.playAll();					// play all animations
});
```
