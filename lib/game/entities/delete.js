
if(this.weapon === 0 && ig.game.level === 1) {
                    this.activeWeapon = "EntityGrenade";
                    this.maxVel.x = 100;
                    this.health = 1;
                    this.maxVel.y = 150;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }else if( this.weapon === 1 && ig.level === 1){
                    this.activeWeapon = "EntityBullet";
                    this.health = 10;
                    this.maxVel.x = 90;
                    this.maxVel.y = 135;
                    this.bounciness = 0;
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }
                else if( this.weapon === 2 && ig.level === 1){
                    this.activeWeapon = "EntityBullet2";
                    this.maxVel.x = 60;
                    this.maxVel.y = 97;
                    this.health = 170;
                    this.accelAir = 400;
                    this.collides = ig.Entity.COLLIDES.ACTIVE;
                }