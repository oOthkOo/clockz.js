	var clockz = {
		
		animCounter : 0,
		anims : [],	
		version : '0.1.1',
		
		create : function (node, anim, frameCallback, animCallback) {
			var c = this;			
			var cAnim = c.isAnimExist(node, anim);
			if (!cAnim) {
				var fc = frameCallback || null;
				var ac = animCallback || null;
				cAnim = c.addAnim(node, anim, fc, ac);
			}
			c.debugAnim(cAnim);			
			return cAnim.id;
		},
		
		playHook : function (node, frame, callback) {
			var c = this;
			var easing = frame.easing || 'swing';
			var duration = frame.duration || 400;
			$(node).animate(frame.properties, duration, easing, callback);
		},

		play: function (id, callback) {
			var c = this;
			var cAnim = c.getAnim(id);
			var frameCallback = cAnim.frameCallback;
			var animCallback = callback ? callback : cAnim.animCallback;
			var current = cAnim.curFrame;
			
			if (current > cAnim.loopEnd) {
				cAnim.curFrame = cAnim.loopStart;				
				if (cAnim.loop) {
					if (cAnim.loopRepeat > 0) {
						if (cAnim.curLoop >= cAnim.loopRepeat) {
							cAnim.state = 'stopped';
							cAnim.curLoop = 0;
							if (animCallback) {
								animCallback( cAnim.id );
							}
						}
						else {
							c.play(id,null);
						}
					}
					else {
						c.play(id,null);
					}
					cAnim.curLoop++;
				}
				else {
					cAnim.state = 'stopped';
					cAnim.curLoop = 0;
					if (animCallback) {
						animCallback( cAnim.id );
					}
				}
			}
			else {								
				cAnim.state = 'started';
				
				c.playHook(cAnim.node, cAnim.frames[current], function() {
						if (frameCallback) {
							frameCallback( cAnim.id, current );
						}
						cAnim.curFrame++;
						if (cAnim.state != 'stopped' && cAnim.state != 'paused') {
							c.play(id,null);
						}
					}
				);
			}
		},

		playAll: function (frameCallback, animCallback) {
			var c = this;
			for (var a=0; a<c.anims.length; a++) {
				if (frameCallback) {
					c.anims[a].frameCallback = frameCallback || null;
				}
				if (animCallback) {
					c.anims[a].animCallback = animCallback || null;
				}
				c.play(c.anims[a].id,null);
 			}
		},

		isAnimExist: function (node, anim) {
			var c = this;
			for (var a=0; a<c.anims.length; a++) {
				if (c.anims[a].node == node && c.anims[a].anim == anim) {
					return c.anims[a];
				}
 			}
			return null;
		},

		getAnim: function (id) {
			var c = this;
			for (var a=0; a<c.anims.length; a++) {
				if (c.anims[a].id == id) {
					return c.anims[a];
				}
 			}
			return null;
		},

		addAnim: function (node, anim, frameCallback, animCallback) {
			var c = this;
			c.anims.push({
				id: c.animCounter,
				name: anim.name || 'untitled',
				loop: anim.loop || false,
				loopStart: anim.loopStart || 0,
				loopEnd: anim.loopEnd || anim.frames.length - 1,
				loopRepeat: anim.loopRepeat || -1,
				state: 'idle',
				frameCallback: frameCallback || null,
				animCallback: animCallback || null,
				curFrame: 0,
				curLoop: 0,
				node: node,
				jnode: $(node),
				frames: anim.frames || []
			});
			c.animCounter++;
			return c.anims[c.anims.length-1];
		},

		debugAnim: function(anim) {
			console.log( 'id: ', anim );
		},

		removeAnim: function (id) {
			var c = this;
			for (var a=0; a<c.anims.length; a++) {
				if (c.anims[a].id == id) {
					return c.anims.remove(anims[a]);
				}
 			}
		},
		
		pause: function ( id ) {
			var c = this;
			var cAnim = c.getAnim(id);
			cAnim.state = 'paused';			
		},

		pauseAll: function () {
			var c = this;		
			for (var a=0; a<c.anims.length; a++) {
				c.anims[a].state = 'paused';
 			}
		},

		stop: function ( id ) {
			var c = this;
			var cAnim = c.getAnim(id);
			cAnim.state = 'stopped';
			cAnim.curLoop = 0;
			cAnim.curFrame = 0;
		},

		stopAll: function () {
			var c = this;		
			for (var a=0; a<c.anims.length; a++) {
				c.anims[a].state = 'stopped';
				c.anims[a].curLoop = 0;
				c.anims[a].curFrame = 0;
 			}
		},	
		
		error: function (message) {				
			console.log('[ERROR]: ' + message);				
		}
	};
