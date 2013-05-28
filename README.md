clockz.js
=========

Frame Animation Manager


jQuery(function () {
  			
				console.log( 'jquery: ' + $().jquery );
				console.log( 'clockz: ' + clockz.version );

				var stopped = false;

				$('#stop').click(function(e) {
					stopped = !stopped;
					if (stopped) {
						$(this).html('Play');
						clockz.stopAll();
					}
					else {
						$(this).html('Stop');
						clockz.playAll();
					}
				});

				var anim1 = {
					name: 'anim1',
					loop: true,
					loopStart: 1,
					loopEnd: 2,
					loopRepeat: 5,
					frames: [
						{
							properties: {
								left: 300,
								opacity: 0.2,
								width: 200,
								height: 200
							},
							duration: 1000,
							easing: 'swing'
						},
						{
							properties: {
								top: 300,
								opacity: 1			
							},
							duration: 1000,
							easing: 'swing'
						},
						{
							properties: {
								top: 10,
								left: 10,
								width: 150,
								height: 150
							},
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
							properties: {
								top: 300
							},
							duration: 2000,
							easing: 'swing'
						},
						{
							type: 'transit',
							properties: {
								rotate: '+=30',
							},
							duration: 400,
							easing: 'fast'
						},
						{
							properties: {
								left: 500,
								opacity: 0.2
							},
							duration: 1000,
							easing: 'swing'
						},
						{
							type: 'transit',
							properties: {
								rotate: '+=30',
							},
							duration: 400,
							easing: 'fast'
						},
						{
							properties: {
								top: 10,
								left: 10,
								opacity: 1
							},
							duration: 1000,
							easing: 'swing'
						}
					]					
				};

				var anim3 = {
					name: 'anim3',
					loop: true,
					frames: [
						{
							properties: {
								top: 600
							},
							duration: 5000,
							easing: 'swing'
						},
						{
							properties: {
								top: 10
							},
							duration: 5000,
							easing: 'swing'
						}
					]					
				};

				var anim4 = {
					name: 'anim4',
					loop: true,
					frames: [
						{
							properties: {
								top: 500,
								left: 500
							},
							duration: 2000,
							easing: 'swing'
						},
						{
							type: 'transit',
							properties: {
								rotate: '+=30',
							},
							duration: 400,
							easing: 'fast'
						},
						{
							properties: {
								top: 10,
								left: 10
							},
							duration: 5000,
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

				var id = clockz.create('#block1', anim1);
				/*clockz.play(id, function() {
					alert('END');	
				});*/

				clockz.create('#block2', anim2);
				clockz.create('#block3', anim3);
				clockz.create('#block4', anim4);

				clockz.playAll();
        
});

Demo
=========

[Click to view](http://htmlpreview.github.io/?https://github.com/oOthkOo/clockz.js/blob/master/clockz.html)
