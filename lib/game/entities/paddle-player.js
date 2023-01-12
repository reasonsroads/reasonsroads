ig.module(
	'game.entities.paddle-player'
)
.requires(
	'game.entities.paddle'
)
.defines(function(){

EntityPaddlePlayer = EntityPaddle.extend({
	
	size: {x: 8, y: 14},
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
		
		animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
		
	
		update: function() {
			if( ig.input.state('up') ) {
				this.vel.y = -200;
			}
			else if( ig.input.pressed('continue') ) {
				console.log('pong space')
			}
			else if( ig.input.state('down') ) {
				this.vel.y = 200;
			}
			else if( ig.input.state('left') ) {
				this.vel.x = -200;
			}
			else if( ig.input.state('right') ) {
				this.vel.x = 200;
			}
			else {
				this.vel.y = 0
				this.vel.x = 0
			}
			
			this.parent();
		}
	});
	
	});