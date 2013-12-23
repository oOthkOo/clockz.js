/**
	Clockz version 0.1.2
	Tierry Danquin
	github : https://github.com/oOthkOo/clockz.js
	demo: http://oothkoo.github.io/clockz.js
**/
	
function Clockz() {
	this.animCounter = 0;
	this.debug = false;
	this.anims = [];	
	this.version = '0.1.2';
}
Clockz.prototype.create = function (node, anim, frameCallback, animCallback) {
	var cAnim = this.isAnimExist(node, anim);
	if (!cAnim) {
		var fc = frameCallback || null;
		var ac = animCallback || null;
		cAnim = this.addAnim(node, anim, fc, ac);
	}
	this.debugAnim(cAnim);			
	return cAnim.id;
};
Clockz.prototype.playHook = function (node, frame, callback) {
	var duration = frame.duration || 400;
	var properties = frame.properties || null;			
	if (properties) {
		var jnode = $(node);
		if (!jnode) {
			this.error( 'playHook(): node is invalid.' );
			return;					
		}
		var easing = frame.easing || 'swing';				
		jnode.animate(properties, duration, easing, callback);			
	}
	else {
		setTimeout(callback, duration);
	}			
};
Clockz.prototype.play = function (id, callback) {
	var cAnim = this.getAnim(id);
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
					this.play(id,null);
				}
			}
			else {
				this.play(id,null);
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
		this.playHook(cAnim.node, cAnim.frames[current], function() {
			if (frameCallback) {
				frameCallback( cAnim.id, current );
			}
			var nextFrame = cAnim.curFrame + 1;						
			var check = cAnim.frames[current].check || null;
			if (check && check.test) {
				cAnim.curFrame = check.test() ? check.succes || nextFrame : check.failed || nextFrame;
				console.log( 'check: ' + ( check.test() ? 'Yes' : 'No' ) );
			}
			else {
				cAnim.curFrame = nextFrame;
			}
			if (cAnim.state != 'stopped' && cAnim.state != 'paused') {
				this.play(id,null);
			}
		}.bind(this));
	}
};
Clockz.prototype.playAll = function (frameCallback, animCallback) {
	for (var a=0; a<this.anims.length; a++) {
		var anim = this.anims[a];
		if (frameCallback) {
			anim.frameCallback = frameCallback || null;
		}
		if (animCallback) {
			anim.animCallback = animCallback || null;
		}
		this.play(anim.id,null);
	}
};
Clockz.prototype.isAnimExist = function (node, animUser) {
	for (var a=0; a<this.anims.length; a++) {
		var anim = this.anims[a];
		if (anim.node == node && anim.anim == animUser) {
			return anim;
		}
	}
	return null;
};
Clockz.prototype.getAnim = function (id) {
	for (var a=0; a<this.anims.length; a++) {
		var anim = this.anims[a];
		if (anim.id == id) {
			return anim;
		}
	}
	return null;
};
Clockz.prototype.addAnim = function (node, anim, frameCallback, animCallback) {
	this.anims.push({
		id: this.animCounter,
		name: anim.name || 'untitled' + this.animCounter,
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
	this.animCounter++;
	return this.anims[this.anims.length-1];
};	
Clockz.prototype.removeAnim = function (id) {
	for (var a=0; a<this.anims.length; a++) {
		var anim = this.anims[a];
		if (anim.id == id) {
			return this.anims.remove(anim);
		}
	}
};	
Clockz.prototype.pause = function ( id ) {
	var cAnim = this.getAnim(id);
	cAnim.state = 'paused';			
};
Clockz.prototype.pauseAll = function () {
	for (var a=0; a<this.anims.length; a++) {
		this.anims[a].state = 'paused';
		}
};
Clockz.prototype.stop = function ( id ) {
	var c = this;
	var cAnim = this.getAnim(id);
	cAnim.state = 'stopped';
	cAnim.curLoop = 0;
	cAnim.curFrame = 0;
};
Clockz.prototype.stopAll = function () {
	for (var a=0; a<this.anims.length; a++) {
		var anim = this.anims[a];
		anim.state = 'stopped';
		anim.curLoop = 0;
		anim.curFrame = 0;
	}
};
Clockz.prototype.debugAnim = function(anim) {
	if (this.debug) {
		console.log( 'anim: ', anim );
	}
};
Clockz.prototype.error = function (message) {
	if (this.debug) {
		console.log('[ERROR]: ' + message);
	}
};