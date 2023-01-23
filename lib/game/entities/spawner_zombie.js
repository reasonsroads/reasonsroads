/*
The EntityDebris will randomly spawn a certain count of EntityDebrisParticle 
entities for a certain duration.

The spawn position of the EntityDebrisParticle is inside the area occupied
by the EntityDebris entity. I.e. make the EntityDebris larger in Weltmeister
to increase the area in which particles will spawn.

Keys for Weltmeister:

duration
	Duration in seconds over which to spawn EntityDebrisParticle entities.
	Default: 5
	
count
	Total count of particles to spawn during the #duration# time span.
	Default: 5
*/

ig.module(
	'game.entities.spawner_zombie'
)
.requires(
	'impact.entity',
	'game.entities.particle'
)
.defines(function(){

EntitySpawner_zombie = ig.Entity.extend({
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 170, 66, 0.7)',

	message: 'screaming kicking crying',
	killTimer: null,
	font: new ig.Font('media/04b03.font.png'),

	size: {x: 8, y: 8},
	duration: 5,
	count: 1,
	
	durationTimer: null,
	nextEmit: null,

	check: function( other ){
		other.kill();
		this.killTimer = new ig.Timer( 2 );
	},

	draw: function(){
		if(this.killTimer && this.killTimer.delta() < 0){
			this.font.draw( this.message, ig.system.width/2, ig.system.height/2 )

		}
		

	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.durationTimer = new ig.Timer();
		this.nextEmit = new ig.Timer();
	},
	
	
	triggeredBy: function( entity, trigger ) {
		this.durationTimer.set( this.duration );
		this.nextEmit.set( 0 );
	},
	
	
	update: function(){		
		if( this.durationTimer.delta() < 0 && this.nextEmit.delta() >= 0 ) {
			this.nextEmit.set( this.duration / this.count );
			
			var x = Math.random().map( 0,1, this.pos.x, this.pos.x+this.size.x );
			var y = Math.random().map( 0,1, this.pos.y, this.pos.y+this.size.y );
			ig.game.spawnEntity( EntityZombie3, x, y );
		}
	}
});



/*
The particles to spawn by the EntityDebris. See particle.js for more details.
*/

EntityDebrisParticle = EntityParticle.extend({
	lifetime: 2,
	fadetime: 1,
	bounciness: 0.6,
	vel: {x: 60, y: 20},
	
	animSheet: new ig.AnimationSheet( 'media/debris.png', 4, 4 ),
		
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 5, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] );		
		this.parent( x, y, settings );
	}
});

});