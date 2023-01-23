ig.module(
    'game.entities.zombie3'
)
.requires(
    'impact.entity',
    'game.entities.chatbubble'
)
.defines(function(){
 
EntityZombie3 = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/gradient.png', 16, 16 ),
    gravityFactor: 0,
    size: {x: 8, y: 14},
    offset: {x: 4, y:2},
    maxVel: {x: 100, y: 100},
    flip: false,
    // friction: {x: 150, y: 0},
    speed: 40,
    // accelGround: 400,
    // accelAir: 200,

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim('walk', .07, [0,1,2,3,4,5]);

        this.durationTimer = new ig.Timer();
		this.nextEmit = new ig.Timer();
    },
    update: function() {
    this.parent();
    var xdir = this.flip ? -1 : 1;
    this.vel.x = this.speed * xdir;
    this.currentAnim.flip.x = this.flip;


    var player = ig.game.getEntitiesByType( EntityPlayer )[0];
    var accel = this.standing ? this.accelGround : this.accelAir;
    if (player){if(player.pos.x > (this.pos.x -50) ){
        console.log('fistance')
        if (player){if( player.pos.x < this.pos.x) {
        this.accel.x = -accel;
                this.flip = true;
    }else if ( player.pos.x  > this.pos.x  ){
        this.accel.x = accel;
                this.flip = false;
    }if ( player.pos.y > this.pos.y){
        this.vel.y = 30;
    }else if ( player.pos.y  < this.pos.y ){
        this.vel.y = -30;
    } else {
        return true;
    }
    }}
    else {
        return true;
    }}
    var parameters = {text: 'Help!', tracks: this};
    ig.game.spawnEntity(EntityChatbubble, 0, 0, parameters);




},
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    check: function( other ) {
        // lower number = less damage
        // other.receiveDamage( 0, this );
    },
    //  removed damage

    // receiveDamage: function(value){
    //     this.parent(value);
    //     if(this.health > 0)
    //     ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
    //         {particles: 2, colorOffset: 1});
    //     // Knockback
	// 	// this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;
	// 	// this.vel.y = -300;
    // },
    kill: function(){
        this.parent();
        // ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
        //     {colorOffset: 1});
        ig.game.stats.kills ++;
    },
    });
});


