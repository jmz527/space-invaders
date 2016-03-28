;(function() {
	// Game constructor function
	var Game = function(canvasID) {
		var canvas = document.getElementById(canvasID);
		var screen = canvas.getContext('2d');
		var gameSize = { x: canvas.width, y: canvas.height };

		var self = this;
		var tick = function() {
			self.update();
			self.draw(screen, gameSize);
			requestAnimationFrame(tick);
		}

		tick();
	};

	Game.prototype = {
		update: function() {
			console.log('hi');
		},

		draw: function() {

		}
	};

	window.onload = function() {
		new Game('screen');
	};
})();