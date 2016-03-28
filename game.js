;(function() {
	// Game constructor function
	var Game = function(canvasID) {
		var canvas = document.getElementById(canvasID);
		var screen = canvas.getContext('2d');
		var gameSize = { x: canvas.width, y: canvas.height };

		this.bodies = [new Player(this, gameSize)];


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
			for (var i = 0; i < this.bodies.length; i++) {
				this.bodies[i].update();
			};
		},

		draw: function(screen, gameSize) {
			screen.clearRect(0, 0, gameSize.x, gameSize.y);
			for (var i = 0; i < this.bodies.length; i++) {
				drawRect(screen, this.bodies[i]);
			};
		}
	};

	var Player = function(game, gameSize) {
		this.game = game;
		this.size = { x: 15, y: 15 };
		this.center = { x: gameSize.x /2, y: gameSize.y - this.size.x };
		this.Keyboarder = new Keyboarder();
	};

	Player.prototype = {
		update: function() {
			if (this.Keyboarder.isDown(this.Keyboarder.KEYS.LEFT)) {
				this.center.x -= 2;
			} else if (this.Keyboarder.isDown(this.Keyboarder.KEYS.RIGHT)) {
				this.center.x += 2;
			}
		}
	};

	var drawRect = function(screen, body) {
		screen.fillRect(body.center.x - body.size.x / 2,
						body.center.y - body.size.y / 2,
						body.size.x, body.size.y);
	};

	var Keyboarder = function() {
		var keyState = {};

		window.onkeydown = function(e) {
			keyState[e.keyCode] = true;
		};

		window.onkeyup = function(e) {
			keyState[e.keyCode] = false;
		};

		this.isDown = function(keyCode) {
			return keyState[keyCode] === true;
		};

		this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
	};

	window.onload = function() {
		new Game('screen');
	};
})();