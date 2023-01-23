ig.module(
	'game.entities.paddle-player'
)
.requires(
	'game.entities.paddle'
)
.defines(function(){

EntityPaddlePlayer = EntityPaddle.extend({
	
	size: {x: 16, y: 20},
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
		// 24 x 24
	animSheet: new ig.AnimationSheet( 'media/playerDown3.png', 24, 24 ),
	setupAnimation: function(offset){
        offset = offset * 10;
            this.addAnim( 'run', .07, [0+offset,1+offset,2+offset,3+offset,4+offset,5+offset] );
            this.addAnim( 'jump', .15, [9+offset, 6+offset] );
            this.addAnim( 'fall', 0.4, [6+offset,7+offset] );
            this.addAnim( 'shoot', .3, [28,29] );
        },

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', .5, [0,1] );
		
		this.vel.x = -1000;
		this.vel.y = 1000;
	},
	
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
	if( this.vel.y < 0 ) {
		this.currentAnim = this.anims.jump;
		// this.maxVel.y = 10000;
	}else if( this.vel.y > 0 ) {
		this.currentAnim = this.anims.fall;
	}else if( this.vel.x != 0 ) {
		this.currentAnim = this.anims.run;
	}
	else{
		this.currentAnim = this.anims.idle;
	}
	
	});