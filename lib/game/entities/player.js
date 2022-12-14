ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
        zIndex: 10,
        coins: 0,
        health: 1,
        size: {x: 8, y: 14},
        offset: {x: 4, y: 2},
        flip: false,
        maxVel: {x: 100, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,
        bounciness: 0,
        activeWeapon: "EntityGrenade",
        weapon: 0,
        totalWeapons: 3,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        startPosition: null,
        invincible: true,
        invincibleDelay: .5,
        invincibleTimer: null,
        jumpSFX: new ig.Sound( 'media/sounds/jump.*' ),
        shootSFX: new ig.Sound( 'media/sounds/shoot.*' ),
        deathSFX: new ig.Sound( 'media/sounds/death.*' ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.setupAnimation(this.weapon);
            this.startPosition = {x:x,y:y};
            this.invincibleTimer = new ig.Timer();
            this.shootTimer = new CustomTimer(2);
            this.makeInvincible();

            // change totalWeapons numbers depending on level
            if ( ig.game.level === 1){
                this.totalWeapons = 1
            }
            else if ( ig.game.level === 2){
                this.totalWeapons = 2
            }
            else if ( ig.game.level === 3){
                this.totalWeapons = 3
            }
    },
        setupAnimation: function(offset){
        offset = offset * 10;
            this.addAnim( 'idle', .7, [0+offset, 9+offset] );
            this.addAnim( 'run', .07, [0+offset,1+offset,2+offset,3+offset,4+offset,5+offset] );
            this.addAnim( 'jump', 1, [9+offset] );
            this.addAnim( 'fall', 0.4, [6+offset,7+offset] );
            this.addAnim( 'shoot', .3, [21,20] );
        },
        kill: function(){
            this.parent();
            var x = this.startPosition.x;
            var y = this.startPosition.y;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
                {callBack:function()
                    {ig.game.spawnEntity(EntityPlayer, x, y)}});
            ig.game.stats.deaths ++;
        },
        giveCoins: function( amount ) {
            // Custom function, called from the EntityCoin
            this.coins += amount;
        },
        makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },
        receiveDamage: function(amount, from){
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
                {particles: 2, colorOffset: 1});
            if(this.invincible)
            return;
            this.parent(amount, from);
            // bounce back
            // this.vel.x = (from.pos.x > this.pos.x) ? -40 : 40;
            // this.vel.y = -300;
        },
        draw: function(){
            if(this.invincible)
            this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1; this.parent();
        },
        update: function() {
            // console.log(this.accelGround)
            // move left or right
            var accel = this.standing ? this.accelGround : this.accelAir;
            if( ig.input.state('left') ) {
                this.accel.x = -accel;
                this.flip = true;
            }else if( ig.input.state('right') ) {
                this.accel.x = accel;
                this.flip = false;
            }else{
                this.accel.x = 0;
            }
            // jump
            if( this.standing && ig.input.pressed('jump') ) {
                this.vel.y = -this.jump;
            }
            // shoot
            if( ig.input.pressed('shoot') ) {
                this.shootTimer.reset();
                ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
                // this.currentAnim = this.anims.shoot;
            }
            if( ig.input.pressed('switch') ) {
                this.weapon ++;
                if(this.weapon >= this.totalWeapons) this.weapon = 0;
                if(this.weapon === 0 && ig.game.level === 1) {
                    this.activeWeapon = "EntityGrenade";
                    this.maxVel.x = 100;
                    this.health = 1;
                    this.maxVel.y = 150;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 1 && ig.game.level === 1){
                    this.activeWeapon = "EntityBullet";
                    this.health = 10;
                    this.maxVel.x = 90;
                    this.maxVel.y = 135;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }
                else if( this.weapon === 2 && ig.game.level === 1){
                    this.activeWeapon = "EntityBullet2";
                    this.maxVel.x = 60;
                    this.maxVel.y = 97;
                    this.health = 170;
                    this.accelAir = 400;
                    this.collides = ig.Entity.COLLIDES.ACTIVE;
                }

                // level 2 weapons
                else if(this.weapon === 0 && ig.game.level === 2) {
                    this.activeWeapon = "EntityGrenade";
                    this.maxVel.x = 100;
                    this.health = 1;
                    this.maxVel.y = 150;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 1 && ig.game.level === 2){
                    this.activeWeapon = "EntityBullet";
                    this.health = 10;
                    this.maxVel.x = 90;
                    this.maxVel.y = 135;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }
                
                // level 3 weapons
                else if(this.weapon === 0 && ig.game.level === 3) {
                    this.activeWeapon = "EntityGrenade";
                    this.maxVel.x = 100;
                    this.health = 1;
                    this.maxVel.y = 150;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 1 && ig.game.level === 3){
                    this.activeWeapon = "EntityBullet";
                    this.health = 10;
                    this.maxVel.x = 90;
                    this.maxVel.y = 135;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 2 && ig.game.level === 3){
                    this.activeWeapon = "EntityBullet2";
                    this.maxVel.x = 60;
                    this.maxVel.y = 97;
                    this.health = 170;
                    this.accelAir = 400;
                    this.collides = ig.Entity.COLLIDES.ACTIVE;
                }
                this.setupAnimation(this.weapon);
            }
            // set the current animation, based on the player's speed
            // adds delay
            if( this.shootTimer.time < .2 ){
                this.currentAnim = this.anims.shoot;
            }
            else if( this.vel.y < 0 ) {
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
           
           
            this.currentAnim.flip.x = this.flip;
            if(this.invincibleTimer.delta() >
            this.invincibleDelay) {
            this.invincible = false;
            this.currentAnim.alpha = 1;
            }
            // move!
            this.parent();
        },
 
    });
    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 1,
        fadetime: 2,
        bounciness: 1,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        // type: ig.Entity.TYPE.NONE,
        // checkAgainst: ig.Entity.TYPE.BOTH,
        // collides: ig.Entity.COLLIDES.PASSIVE,
        // checkAgainst: ig.Entity.TYPE.A,
        // check: function( other ){
        //     other.receiveDamage( 10, this );
        //     this.kill();
        // },
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
            this.addAnim('idle', 0.2, [frameID]);
            this.vel.x = (Math.random()*2-1) * this.vel.x;
            this.vel.y = (Math.random()*2-1) * this.vel.y;
            this.idleTimer = new ig.Timer();
        },
        update: function(){
            if(this.idleTimer.delta() > this.lifetime)
            {this.kill();
            return;}
            this.currentAnim.alpha = this.idleTimer.delta().map(
            this.lifetime - this.fadetime, this.lifetime, 1, 0);
            this.parent();
        }
    });
EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 25,
        init: function(x, y,settings){
            this.parent(x, y, settings);
            for(var i = 0; i < this.particles; i++)
            ig.game.spawnEntity(EntityDeathExplosionParticle, x, y,
                {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                this.idleTimer = new ig.Timer();
        },
        update: function() {
            if(this.idleTimer.delta() > this.lifetime)
            {this.kill();
            if(this.callBack)
            this.callBack();
            return;
        }
        }
 });
    EntityBullet = ig.Entity.extend({
        lifetime: 1,
        fadetime: 1,
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 200, y:0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) , y+8, settings);
            this.vel.x = this.accel.x = (settings.flip ? - this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },
       
    check: function( other ) {
        other.receiveDamage( 2, this );
        this.kill();
    }
});
EntityBullet2 = ig.Entity.extend({
    lifetime: .1,
    fadetime: 1,
    size: {x: 9, y: 3},
    animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
    maxVel: {x: 0, y:20},
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.ACTIVE,
    init: function( x, y, settings ) {
        this.parent( x + (settings.flip ? -9 : 9) , y+8, settings);
        this.vel.x = this.accel.x = (settings.flip ? - this.maxVel.x : this.maxVel.x);
        this.addAnim( 'idle', 0.2, [0] );
        this.idleTimer = new ig.Timer();
    },
   
check: function( other ) {
    other.receiveDamage( 10, this );
    this.kill();
},
update: function() {
    if(this.idleTimer.delta() > this.lifetime)
    {this.kill();
    if(this.callBack)
    this.callBack();
    return;
}
}
      
});
    EntityGrenade = ig.Entity.extend({
        lifetime: .01,
        size: {x: 4, y: 4},
        offset: {x: 2, y:2},
        maxVel: {x: 100, y: 150},
        animSheet: new ig.AnimationSheet( 'media/grenade.png', 8, 8 ),
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        type: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        checkAgainst: ig.Entity.TYPE.B,
        bounciness: .7,
        bounceCounter: 0,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 7), y, settings);
            this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.vel.y = -(50 + (Math.random()*300));
            this.addAnim('idle', 0.2, [0,1] );},
 
        handleMovementTrace: function( res ) {
            this.parent( res );
            if ( res.collision.x || res.collision.y ) {
                // only bounce 3 times
                this.bounceCounter++;
                if( this.bounceCounter > 1 ) {
                    this.kill();
                }
            }
        },
        check: function( other ){
            other.receiveDamage( 5, this );
            this.kill();
        },
        kill: function(){
            for(var i = 0; i < 20; i++)
            ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);
            this.parent();
        }

});
    EntityGrenadeParticle = ig.Entity.extend({
    size: {x: 1, y: 1},
    maxVel: {x: 160, y: 200},
        // type: ig.Entity.TYPE.NONE,
        // checkAgainst: ig.Entity.TYPE.BOTH,
        // collides: ig.Entity.COLLIDES.PASSIVE,
        // checkAgainst: ig.Entity.TYPE.A,
    lifetime: 1,
    fadetime: 1,
    bounciness: 1,
    vel: {x: 40, y: 50},
    friction: {x:20, y: 20},
    collides: ig.Entity.COLLIDES.LITE,
    animSheet: new ig.AnimationSheet ('media/explosion.png', 1, 1),
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.vel.x = (Math.random() * 4 - 1) * this.vel.x;
        this.vel.y = (Math.random() * 10 - 1) * this.vel.y;
        this.idleTimer = new ig.Timer();
        var frameID = Math.round(Math.random()*7);
        this.addAnim( 'idle', 0.2, [frameID]);
    },
        // check: function( other ){
        //     other.receiveDamage( 10, this );
        //     this.kill();
        // },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime )
        {
            this.kill();
            return;
        }
        this.currentAnim.alpha = this.idleTimer.delta().map(
            this.lifetime - this.fadetime, this.lifetime,
            1, 0
        );
        this.parent();
        }
       
    });
});
 
 
 
 
 
 
 
 

