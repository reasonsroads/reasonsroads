ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.characterset',
    'game.entities.chatbubble_green',
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
        zIndex: 10,
        health: 1,
        size: {x: 7.8, y: 14},
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
        offset = offset * 12;
            this.addAnim( 'idle', .7, [0+offset, 6+offset] );
            this.addAnim( 'run', .07, [0+offset,1+offset,2+offset,3+offset,4+offset,5+offset] );
            this.addAnim( 'jump', .15, [9+offset, 6+offset] );
            this.addAnim( 'fall', 0.4, [6+offset,8+offset] );
            this.addAnim( 'shoot', .2, [10+offset, 10+offset, 11+offset] );
        },
        kill: function(){
            this.parent();
            ig.game.respawnPosition = this.startPosition;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x,
                this.pos.y, {callBack:this.onDeath});
        },
        // when player dies, increase stats, end game, respawn
        onDeath: function(){
            ig.game.stats.deaths ++;
            ig.game.lives --;
            if(ig.game.lives < 0){
                ig.game.gameOver();
            }else{
                ig.game.spawnEntity(EntityPlayer, ig.game.respawnPosition.x, ig.game.respawnPosition.y)
                if(EntityPlayer){
                    console.log('same person')
                    this.activeWeapon;
                };
            }
        },
        makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },
        receiveDamage: function(amount, from){
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
                {particles: 2, colorOffset: 0});
            if(this.invincible)
            return;
            this.parent(amount, from);
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
            //speech
            if( ig.input.pressed('speak') ) {
                if(!ig.game.getEntityByName('playerBubble')) {
                  var parameters = {text: 'I pwn.', tracks: 'player1', margin: 0, lifeSpan: 5, shape: 'square', name: 'playerBubble', color:[60,70,30]};
                  ig.game.spawnEntity(EntityChatbubble_green, 0, 0, parameters);
                }
              }        
        // shoot
        // jester shoot delay for level 1-2
        if( ig.input.pressed('shoot') && this.shootTimer.time > .2 && ig.game.level > 0) {
            this.shootTimer.reset();
            ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
            console.log('jester shoot delay for level 1-2')
        }
        // shoot delay for archer in level 1-2
        else if( ig.input.pressed('shoot') && this.shootTimer.time > 0 && ig.game.level > 0 && this.weapon > 0) {
            this.shootTimer.reset();
            ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
            console.log('shoot delay')
        }
        // shoot delay for level 3
        // jester shoot delay level 3
        else if( ig.input.pressed('shoot') && this.shootTimer.time > .12 && ig.game.level === 3 && this.weapon === 0) {
            this.shootTimer.reset();
            ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
            console.log('shoot delay')
        }
        // shoot time delay for non jester level 3
        else if( ig.input.pressed('shoot') && this.shootTimer.time > 0 && ig.game.level === 3 && this.weapon > 0) {
            this.shootTimer.reset();
            ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
            console.log('shoot delay')
        }
        // super
        // super shoot for jester on level 3
        if( ig.input.pressed('continue') && this.weapon === 0 && ig.game.level === 3 ) {
            this.shootTimer.reset();
            ig.game.spawnEntity( this.Weapon = "EntityBullet", this.pos.x, this.pos.y, {flip:this.flip} );
            console.log('super shoot')
        }
             // SWITCH UP
             // SWITCH UP
            if( ig.input.pressed('switchup') ) {
                this.weapon ++;
                if(this.weapon >= this.totalWeapons) this.weapon = 0;
                if(this.weapon === 0 && ig.game.level === 1) {
                    this.activeWeapon = "EntityGrenade";
                    this.maxVel.x = 100;
                    this.health = 1;
                    this.maxVel.y = 150;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }
                // level 2 weapons UP
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
                
                // level 3 weapons UP
                else if(this.weapon === 0 && ig.game.level === 3) {
                    console.log("1");
                    this.activeWeapon = "EntityGrenade";
                    this.maxVel.x = 100;
                    this.health = 1;
                    this.maxVel.y = 150;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 1 && ig.game.level === 3){
                    console.log("2");
                    this.activeWeapon = "EntityBullet";
                    this.health = 10;
                    this.maxVel.x = 90;
                    this.maxVel.y = 135;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 2 && ig.game.level === 3){
                    console.log("3");
                    this.activeWeapon = "EntityBullet2";
                    this.maxVel.x = 60;
                    this.maxVel.y = 110;
                    this.health = 170;
                    this.accelAir = 400;
                    this.collides = ig.Entity.COLLIDES.ACTIVE;
                }
                this.setupAnimation(this.weapon);
            }
            // SWITCH DOWN
            // SWITCH DOWN
            if( ig.input.pressed('switchdown') ) {
                this.weapon --;
                // if(this.weapon <= -1) this.weapon = 0;
                if(this.weapon <= -1) this.weapon =this.totalWeapons-1;
                if(this.weapon === 0 && ig.game.level === 1) {
                    this.activeWeapon = "EntityGrenade";
                    this.maxVel.x = 100;
                    this.health = 1;
                    this.maxVel.y = 150;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }
                // level 2 weapons DOWN
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
                // level 3 weapons DOWN
                else if(this.weapon === 0 && ig.game.level === 3) {
                    console.log("1");
                    this.activeWeapon = "EntityGrenade";
                    this.maxVel.x = 100;
                    this.health = 1;
                    this.maxVel.y = 150;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 1 && ig.game.level === 3){
                    console.log("2");
                    this.activeWeapon = "EntityBullet";
                    this.health = 10;
                    this.maxVel.x = 90;
                    this.maxVel.y = 135;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 2 && ig.game.level === 3){
                    console.log("3");
                    this.activeWeapon = "EntityBullet2";
                    this.maxVel.x = 60;
                    this.maxVel.y = 110;
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
});