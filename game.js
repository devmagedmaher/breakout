			
			/* Javascript code goes here.. */

			// canvas
				var canvas = document.getElementById('gameCanvas');
				var c = canvas.getContext('2d');

			// is playing flag
		
				var playing = false;

			// keyboard flags
				var left = false;
				var right = false;

			// ball properties
				var radius = 4;
				var x = 240;
				var y = 280;
				var xSpeed = 3;
				var ySpeed = -3;
				var maxSpeed = 6;

			// player properties
				var width = 100;
				var height = 10;
				var player_x = canvas.width/2 - width/2;
				var player_y = canvas.height - height;
				var player_xSpeed = 0;
				var score = 0;
				var lives = 3;
				var controller = 'keyboard';
				var xMouse = 0;

			// bricks properties
				var bricks = [];
				var brickRows = 14;
				var brickCols = 17;
				var brickWidth = 20;
				var brickHeight = 6;
				var brickPadding = 4;
				var brickOffsetTop = 50
				var brickOffsetLeft = 35;


			// play function 
			function play() {
				playing = true;
				draw();
			}

			function pause() {
				playing = false;
			}

			// draw ball function
			function drawBall() {
				c.beginPath();
				c.arc(x, y, radius, 0, Math.PI*2);
				c.strokeStyle = '#a00';
				c.fillStyle = 'orange';
				c.lineWidth = 5;
				c.stroke();
				c.fill();
				c.closePath();
			}



			// draw player function 
			function drawPlayer() {
				c.beginPath();
				c.fillStyle = '#09a';
				c.fillRect(player_x, player_y, width, height);
				c.closePath();
			}


			// draw gameover function
			function drawGameover() {
				pause();
				c.beginPath();
				c.textAlign = 'center';
				c.textBaseline = 'middle';
				c.font = 'bold 28px sans-serif';
				// shadow text
				c.fillStyle = 'black';
				c.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2 + 2);
				// text
				c.fillStyle = 'red';
				c.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
        // try again text
				// c.fillStyle = '#555';
				// c.font = '22px tahoma';
				// c.fillText('Click to play again..', canvas.width / 2, canvas.height / 2 + 100);
				// canvas.addEventListener('click', startGame);
			}

			// try agin function
			function drawTryAgain() {
				pause();
				c.beginPath();
				c.textAlign = 'center';
				c.textBaseline = 'middle';
				c.font = 'bold 28px sans-serif';
				// shadow text
				c.fillStyle = 'black';
				c.fillText('You lost!', canvas.width / 2, canvas.height / 2 + 2);
				// text
				c.fillStyle = 'red';
				c.fillText('You lost!', canvas.width / 2, canvas.height / 2);
				setTimeout(_ => {
					x = Math.random() * (canvas.width - 50) - 50;
					y = player_y - height;
					xSpeed = Math.random() * 6 - 3;
					ySpeed = -3;
					play();
				}, 2000);
			}

			// draw game win function
			function drawGamewin() {
				pause();
				c.beginPath();
				c.textAlign = 'center';
				c.textBaseline = 'middle';
				c.font = 'bold 28px sans-serif';
				// text
				c.fillStyle = '#0d0';
				c.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
			}

			// draw score
			function drawScore() {
				c.beginPath();
				c.textAlign = 'left';
				c.textBaseline = 'middle';
				c.font = '14px sans-serif';
				c.fillStyle = '#333';
				c.fillText(`score: ${score}`, 15, 15);
			}

			// draw lives
			function drawLives() {
				c.beginPath();
				c.textAlign = 'left';
				c.textBaseline = 'middle';
				c.font = '14px sans-serif';
				c.fillStyle = '#333';
				c.fillText(`lives: ${lives}`, canvas.width - 60, 15);
			}

			// create bricks objects
			for (var i = 0; i < brickRows; i++) {
				bricks[i] = [];
				for (var j = 0; j < brickCols; j++) {
					bricks[i][j] = {};
					bricks[i][j].visible = true;
					bricks[i][j].x = j * (brickWidth + brickPadding) + brickOffsetLeft;
					bricks[i][j].y = i * (brickHeight + brickPadding) + brickOffsetTop;
				}
			}

			// draw one brick
			function drawOneBrick(x, y) {
				c.beginPath();
				c.fillStyle = '#909';
				c.fillRect(x, y, brickWidth, brickHeight);
				c.closePath();
			}

			// bricks draw
			function drawBricks() {
				for (let r = 0; r < brickRows; r++) {
					for(let c = 0; c < brickCols; c++) {
						if (bricks[r][c].visible) {
							drawOneBrick(bricks[r][c].x, bricks[r][c].y);
						}
					}
				}				
			}

			// detect player collision function 
			function detectPlayerCollision() {
				if (y - radius > player_y - height) {
					if (x < player_x + width && x > player_x) {
					// when ball is within the x cordination of player
						ySpeed = -3;
						// var factor;
						// if (player_xSpeed != 0) {factor = player_xSpeed}
						// else { factor = mouse_xSpeed / mouseSpeedDevid }
						xSpeed += Math.random() * player_xSpeed / 2;
						console.log(player_xSpeed, xMouse, Math.random() * player_xSpeed / 2);
					}
				}
			}

			// detect brick collision function
			function detectBrickCollision() {
				for (let r = 0; r < brickRows; r++) {
					for(let c = 0; c < brickCols; c++) {
						var b = bricks[r][c];
						if (x + radius > b.x && x - radius< b.x + brickWidth && y + radius > b.y && y - radius < b.y + brickHeight && b.visible) {
							ySpeed *= -1;
							score++;
							b.visible = false;
						}
					}
				}								
			}

      // draw start message
      function drawStart() {
        c.beginPath();
        c.textAlign = 'center';
        c.font = 'bold 28px tahoma';
        c.textBaseLine = 'middle';
        c.fillStyle = '#0a0';
        c.fillText('Click to start!', canvas.width/2, canvas.height/2 + 70);
        c.strokeStyle = '#030';
        c.lineWidth = 1.5;
        c.strokeText('Click to start!', canvas.width/2, canvas.height/2 + 70);
      }

			// draw loop function
			function draw() {
				// clear canvas every frame
				c.clearRect(0, 0, canvas.width, canvas.height);
				// draw ball
				drawBall();
				// draw player
				drawPlayer();
				// draw bricks
				drawBricks();
				// draw score
				drawScore();
				// draw lives
				drawLives();

				// move player
				if (controller === 'mouse') {
					player_xSpeed = (xMouse - player_x - (width/2)) / 10;
				}
				player_x += player_xSpeed;
				// listen to keyboard events
				if (controller == 'keyboard') {
					if 		(left && player_x > 0) 						{ player_xSpeed = -7}
					else if (right && player_x < canvas.width - width) 	{ player_xSpeed = 7	}
					else 												{ player_xSpeed = 0 }
				}

				// move circle
				x += xSpeed;
				y += ySpeed;
				// bounce on 3 walls
				if (x >= canvas.width  - radius || x <= radius) { xSpeed *= -1 }
				if (y <= radius) { ySpeed *= -1 }
				// Game OVER
				else if (y >= canvas.height - radius) {
					lives--;
					if (lives < 0) {
						drawGameover();
					} else {
						// try agin
						drawTryAgain();
					}
				}

				// detect ball collision with player
				detectPlayerCollision();

				// detect ball collision with bricks
				detectBrickCollision();

				// suppress ball's xSpeed
				if 		(xSpeed > maxSpeed) 	 { xSpeed = maxSpeed }
				else if (xSpeed < maxSpeed * -1) { xSpeed = maxSpeed * -1 }

				// Game WIN
				if (score >= brickCols * brickRows) {
					setTimeout(drawGamewin, 100);
				}
				if (playing) {
					requestAnimationFrame(draw);
				}
			}
      draw();
      drawStart();

      canvas.addEventListener('click', startGame);

      function startGame() {
        play();
        canvas.removeEventListener('click', startGame);
      }

			// keydown handler
			document.addEventListener('keydown', function (e) {
				switch(e.key) {
					case 'Right':
					case 'ArrowRight':
						right = true;
						break;
					case 'Left':
					case 'ArrowLeft':
						left = true;
						break;
				}
			});

			// keyup handler
			document.addEventListener('keyup', function (e) {
				switch(e.key) {
					case 'Right':
					case 'ArrowRight':
						right = false;
						break;
					case 'Left':
					case 'ArrowLeft':
						left = false;
						break;
				}				
			});

			// mousemove handler
			canvas.addEventListener('mouseenter', function () {
				controller = 'mouse';
				document.addEventListener('mousemove', function (e) {
					xMouse = e.offsetX;
				});
			});
			canvas.addEventListener('mouseleave', function () {
				controller = 'keyboard';
			});
			// touch handler
			document.addEventListener('touchmove', function (e) {
				var touch = e.touches[0];
				var leftOffset = (window.innerWidth - canvas.width) / 2;
				player_x = touch.pageX - leftOffset - (width/2);
			});
