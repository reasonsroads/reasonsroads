ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'game.levels.dorm1',
    'game.levels.dorm2',
    'game.levels.desert',
    'game.entities.player',
    'impact.font',
)
 
.defines(function(){
 
MyGame = ig.Game.extend({
    gravity: 300,
	coinIcon: new ig.Image( 'media/coin.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    statText: new ig.Font( 'media/04b03.font.png' ),
    showStats: false,
    statMatte: new ig.Image( 'media/stat-matte.png' ),
    levelTimer: new ig.Timer(),
    levelExit: null,
    stats: {times: 0, kills: 0, deaths: 0},
    loadLevel: function( data ) {
        // console.log(data);
        this.level = data.name;
        this.stats = {time: 0, kills: 0, deaths: 0};
    	this.parent(data);
        this.levelTimer.reset();
        this.stats = {time: 0, kills: 0, deaths: 0}
    },
    init: function() {
        this.loadLevel( LevelDesert );
 
        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
        ig.input.bind( ig.KEY.X, 'shoot' );
        ig.input.bind( ig.KEY.DOWN_ARROW, 'switch' );
        ig.input.bind( ig.KEY.SPACE, 'continue');
 
        // music
        ig.music.add( 'media/sounds/piano.mp3' );
        ig.music.volume = .1;
        ig.music.play();
    },
 
    update: function() {
        //screen follows the player
        var player = this.getEntitiesByType( EntityPlayer ) [0];
        if( player ){
            this.screen.x = player.pos.x - ig.system.width/3.5;
            this.screen.y = player.pos.y - ig.system.height/1.4;
            if( player.pos.x > 500 && this.instructText )
            this.instructText = false;
        }
        // Update all entities and BackgroundMpas
        if(!this.showStats){
            this.parent();
        }else{
            if(ig.input.state('continue')){
                this.showStats = false;
                this.levelExit.nextLevel();
                this.parent();
            }
        }
    },
draw: function() {
        // Draw all entities and backgroundMaps
        this.parent();
		// Draw the heart and number of coins in the upper left corner.
		// 'this.player' is set by the player's init method
		if( this.player ) {
			var x = 16, 
				y = 16;

			for( var i = 0; i < this.player.maxHealth; i++ ) {
				// Full or empty heart?
				if( this.player.health > i ) {
					this.heartFull.draw( x, y );
				}
				else {
					this.heartEmpty.draw( x, y );	
				}

				x += this.heartEmpty.width + 8;
			}

			// We only want to draw the 0th tile of coin sprite-sheet
			x += 48;
			this.coinIcon.drawTile( x, y+6, 0, 36 );

			x += 42;
			this.font.draw( 'x ' + this.player.coins, x, y+10 )
		}
		if(this.showStats){
            this.statMatte.draw(0,0);
            var x = ig.system.width/2;
            var y = ig.system.height/2 - 20;
            this. statText.draw( 'Level Complete', x, y,
            ig.Font.ALIGN.CENTER);
            this. statText.draw('Level Complete', x, y, ig.Font.ALIGN.CENTER);
            this. statText.draw( 'Time: '+this.stats.time, x, y+30, ig.Font.ALIGN.CENTER);
            this. statText.draw( 'Kills: '+this.stats.kills, x, y+40, ig.Font.ALIGN.CENTER);
            this. statText.draw( 'Deaths: '+this.stats.deaths, x, y+50, ig.Font.ALIGN.CENTER);
            this. statText.draw( 'Press Spacebar to continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
        }
    },
    toggleStats: function( levelExit ) {
        this.showStats = true;
        this.stats.time = Math.round(this.levelTimer.delta());
        this.levelExit = levelExit;
    },
});
 
StartScreen = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/roads2.png' ),
    title: new ig.Image( 'media/game-title.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/screen-bg.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start' );
    },
    update: function() {
        if(ig.input.pressed ('start')) {
            ig.system.setGame(StartScreen2)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        this.mainCharacter.draw(0,0);
        var x = ig.system.width/2,
        y = ig.system.height - 15;
        this.instructText.draw( 'Press Spacebar To Start', x+20, y-10,
        ig.Font.ALIGN.CENTER );
    }
});
 
// take 2
 
StartScreen2 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/face.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start' );
    },
    update: function() {
        if(ig.input.pressed ('start')) {
            ig.system.setGame(StartScreen3)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        this.mainCharacter.draw(0,0);
        var x = ig.system.width/2,
        y = ig.system.height - 10;
        this.instructText.draw( 'Use the arrow keys to move. Use the down key to switch. Use X to fire.', x+20, y,
        ig.Font.ALIGN.CENTER );
    }
});
 
// take 3
 
StartScreen3 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/face2.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start' );
    },
    update: function() {
        if(ig.input.pressed ('start')) {
            ig.system.setGame(StartScreen4)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        this.mainCharacter.draw(0,0);
        var x = ig.system.width/2,
        y = ig.system.height - 10;
        this.instructText.draw( 'Use the arrow keys to move. Use the down key to switch. Use X to fire.', x+20, y,
        ig.Font.ALIGN.CENTER );
    }
});

// take 4
 
StartScreen4 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/face3.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start' );
    },
    update: function() {
        if(ig.input.pressed ('start')) {
            ig.system.setGame(StartScreen5)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        this.mainCharacter.draw(0,0);
        var x = ig.system.width/2,
        y = ig.system.height - 10;
        this.instructText.draw( 'Use the arrow keys to move. Use the down key to switch. Use X to fire.', x+20, y,
        ig.Font.ALIGN.CENTER );
    }
});

// take 5
 
StartScreen5 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/desert_screen.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start' );
    },
    update: function() {
        if(ig.input.pressed ('start')) {
            ig.system.setGame(StartScreen6)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        this.mainCharacter.draw(0,0);
        var x = ig.system.width/2,
        y = ig.system.height - 10;
        this.instructText.draw( 'Use the arrow keys to move. Use the down key to switch. Use X to fire.', x+20, y,
        ig.Font.ALIGN.CENTER );
    }
});
// instruction
 
StartScreen5 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/instruction.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start' );
    },
    update: function() {
        if(ig.input.pressed ('start')) {
            ig.system.setGame(MyGame)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        this.mainCharacter.draw(0,0);
        var x = ig.system.width/2,
        y = ig.system.height - 10;
        this.instructText.draw( 'Press Space to continue.', x+20, y,
        ig.Font.ALIGN.CENTER );
    }
});
// ig.main( '#canvas', StartScreen2, 60, 500, 220, 3 );
 
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 500, 220, 3 );
 
});
 
 

