ig.module(
    'game.main',
    'game.dialogue',
)
.requires(
    'impact.game',
    'game.levels.dorm1',
    'game.levels.dorm2',

    'game.levels.4_top_down',
    'game.levels.pong',
    'game.levels.pong2',
    'game.levels.pong3',
    'game.levels.house_1',
    'game.levels.house_2',
    'game.levels.neighborhood_1',
    'game.levels.neighborhood_2',

    'game.levels.map_1',
    'game.levels.map_2',


    'game.levels.level_00',
    'game.levels.level_0',
    'game.levels.start1',
    'game.levels.start2',
    'game.levels.start3',
    'game.levels.start4',
    'game.levels.start5',
    'game.levels.start6',
    'game.levels.start7',
    'game.levels.start8',

    'game.levels.1bstart1',
    'game.levels.1bstart2',
    'game.levels.1bstart3',
    'game.levels.1bstart4',
    'game.levels.1bstart5',

    'game.levels.2start1',
    'game.levels.2start2',
    'game.levels.2start3',
    'game.levels.2start4',
    'game.levels.2start5',
    'game.levels.2start6',

    'game.levels.3start1',
    'game.levels.3start2',
    'game.levels.3start3',
    'game.levels.3start4',

    'game.levels.4start1',
    'game.levels.4start2',

    'game.levels.level_1',
    'game.levels.level_2',
    'game.levels.level_3',

    'game.entities.player',
    'game.entities.paddle-player',
    'game.entities.player_3',
    'plugins.gamepad',
    'plugins.touch-button',
    'impact.font',
)
 
.defines(function(){

                    // top-view of home/neighborhood 
//                         MyGame0 = ig.Game.extend({
//                             	// Load a font
//                         font: new ig.Font( 'media/04b03.font.png' ),
//                         levelExit: null,
//                         statText: new ig.Font( 'media/04b03.font.png' ),
//                         showStats: false,
//                         statMatte: new ig.Image( 'media/stat-matte.png' ),
//                         levelTimer: new ig.Timer(),
//                         stats: {times: 0, kills: 0, deaths: 0, score_points: 0,},
//                         loadLevel: function( data ) {
//                             // console.log(data);
//                             this.level = data.name;
//                             this.stats = {time: 0, kills: 0, deaths: 0, score_points: 0,};
//                             this.parent(data);
//                             this.levelTimer.reset();
//                         },
//                         init: function() {
//                             ig.input.bind( ig.KEY.UP_ARROW, 'up' );
//                             ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
//                             ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
//                             ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
//                             ig.input.bind( ig.KEY.SPACE, 'continue');
//                             ig.input.bind( ig.KEY.C, 'shoot' );
                            
//                             this.loadLevel( LevelHouse_1 );
//                                     // Align touch buttons to the screen size, if we have any
// 	                    	if( window.myTouchButtons2 ) {
//                             window.myTouchButtons2.align(); 
//                         }
//                         },
//                         update: function() {
//                             //screen follows the player
//                             var player = this.getEntitiesByType( EntityPaddlePlayer ) [0];
//                             if( player ){
//                                 this.screen.x = player.pos.x - ig.system.width/3.5;
//                                 this.screen.y = player.pos.y - ig.system.height/1.4;
//                                 if( player.pos.x > 500 && this.instructText )
//                                 this.instructText = false;
//                             }
//                             // Update all entities and BackgroundMpas
//                             if(!this.showStats){
//                                 this.parent();
//                             }else{
//                                 // level exit if level 1-3
//                                 if(ig.input.state('shoot') && this.level < 2){
//                                     console.log('exit level')
//                                     this.showStats = false;
//                                     this.levelExit.nextLevel();
//                                     this.parent();
//                                 }
//                                 // initiate the level exit into the "pong" screen
//                                 else if(ig.input.state('shoot') && this.level === 2){
//                                     console.log('exit 4')
//                                     ig.system.setGame(StartScreen2);
//                             }
//                             }
//                         },     
//                         check:function(other){
//                             if( ig.input.pressed('continue')) {
//                                 console.log('pong hehe')
//                             }
//                             },           
//                         draw: function() {
//                             // Draw all entities and backgroundMaps
//                             this.parent();
//                             // gem
//                             this.font.draw( 'Gems: ' + this.score_points, 10, 10, ig.Font.ALIGN.LEFT );
                    
//                             this.statText.draw("Lives", 5,5);
//                             for(var i=0; i < this.lives; i++)
//                             this.lifeSprite.draw(((this.lifeSprite.width +2) * i)+5, 15);
//                             // 'this.player' is set by the player's init method
//                             // player exit
//                             if(this.showStats){
//                                 this.statMatte.draw(0,0);
//                                 var x = ig.system.width/2;
//                                 var y = ig.system.height/2 - 20;
//                                 this. statText.draw( 'Level Complete', x, y,
//                                 ig.Font.ALIGN.CENTER);
//                                 this. statText.draw('Level Complete', x, y, ig.Font.ALIGN.CENTER);
//                                 this. statText.draw( 'Time: '+this.stats.time, x, y+30, ig.Font.ALIGN.CENTER);
//                                 this. statText.draw( 'Kills: '+this.stats.kills, x, y+40, ig.Font.ALIGN.CENTER);
//                                 this. statText.draw( 'Deaths: '+this.stats.deaths, x, y+50, ig.Font.ALIGN.CENTER);
//                                 this. statText.draw('Gems: '+this.stats.score_points, x, y+60, ig.Font.ALIGN.CENTER);
//                                 this. statText.draw( 'pong continue', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
//                             }
//                             if( window.myTouchButtons2 ) {
//                                 window.myTouchButtons2.draw(); 
//                             }
//                         },
//                         toggleStats: function( levelExit ) {
//                             this.showStats = true;
//                             this.stats.time = Math.round(this.levelTimer.delta());
//                             this.levelExit = levelExit;
//                         },
                        
// });
            // map gameplay
                // MyGame2 = ig.Game.extend({
                //     // Load a font
                // font: new ig.Font( 'media/04b03.font.png' ),
                // levelExit: null,
                // statText: new ig.Font( 'media/04b03.font.png' ),
                // showStats: false,
                // statMatte: new ig.Image( 'media/stat-matte.png' ),
                // levelTimer: new ig.Timer(),
                // stats: {times: 0, kills: 0, deaths: 0, score_points: 0,},
                // loadLevel: function( data ) {
                // // console.log(data);
                // this.level = data.name;
                // this.stats = {time: 0, kills: 0, deaths: 0, score_points: 0,};
                // this.parent(data);
                // this.levelTimer.reset();
                // },
                // init: function() {
                // ig.input.bind( ig.KEY.UP_ARROW, 'up' );
                // ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
                // ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
                // ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
                // ig.input.bind( ig.KEY.SPACE, 'continue');
                // ig.input.bind( ig.KEY.C, 'shoot' );

                // this.loadLevel( LevelMap_1 );
                //         // Align touch buttons to the screen size, if we have any
                // if( window.myTouchButtons2 ) {
                // window.myTouchButtons2.align(); 
                // }
                // },
                // update: function() {
                // //screen follows the player
                // var player = this.getEntitiesByType( EntityPlayer_3 ) [0];
                // if( player ){
                //     this.screen.x = player.pos.x - ig.system.width/3.5;
                //     this.screen.y = player.pos.y - ig.system.height/1.4;
                //     if( player.pos.x > 500 && this.instructText )
                //     this.instructText = false;
                // }
                // // Update all entities and BackgroundMpas
                // if(!this.showStats){
                //     this.parent();
                // }else{
                //     // level exit if level 1-3
                //     if(ig.input.state('shoot') && this.level < 2){
                //         console.log('exit level')
                //         this.showStats = false;
                //         this.levelExit.nextLevel();
                //         this.parent();
                //     }
                //     // initiate the level exit into the "pong" screen
                //     else if(ig.input.state('shoot') && this.level === 2){
                //         console.log('exit 4')
                //         ig.system.setGame(StartScreen3);
                // }
                // }
                // },     
                // check:function(other){
                // if( ig.input.pressed('continue')) {
                //     console.log('pong hehe')
                // }
                // },           
                // draw: function() {
                // // Draw all entities and backgroundMaps
                // this.parent();
                // // gem
                // this.font.draw( 'Gems: ' + this.score_points, 10, 10, ig.Font.ALIGN.LEFT );

                // this.statText.draw("Lives", 5,5);
                // for(var i=0; i < this.lives; i++)
                // this.lifeSprite.draw(((this.lifeSprite.width +2) * i)+5, 15);
                // // 'this.player' is set by the player's init method
                // // player exit
                // if(this.showStats){
                //     this.statMatte.draw(0,0);
                //     var x = ig.system.width/2;
                //     var y = ig.system.height/2 - 20;
                //     this. statText.draw( 'Level Complete', x, y,
                //     ig.Font.ALIGN.CENTER);
                //     this. statText.draw('Level Complete', x, y, ig.Font.ALIGN.CENTER);
                //     this. statText.draw( 'Time: '+this.stats.time, x, y+30, ig.Font.ALIGN.CENTER);
                //     this. statText.draw( 'Kills: '+this.stats.kills, x, y+40, ig.Font.ALIGN.CENTER);
                //     this. statText.draw( 'Deaths: '+this.stats.deaths, x, y+50, ig.Font.ALIGN.CENTER);
                //     this. statText.draw('Gems: '+this.stats.score_points, x, y+60, ig.Font.ALIGN.CENTER);
                //     this. statText.draw( 'pong continue', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
                // }
                // if( window.myTouchButtons2 ) {
                //     window.myTouchButtons2.draw(); 
                // }
                // },
                // toggleStats: function( levelExit ) {
                // this.showStats = true;
                // this.stats.time = Math.round(this.levelTimer.delta());
                // this.levelExit = levelExit;
                // },

                // });

        // The side scrolling game!
            MyGame1 = ig.Game.extend({
                font: new ig.Font( 'media/04b03.font.png' ),
                score_points: 0,
                gravity: 300,
                instructText: new ig.Font( 'media/04b03.font.png' ),
                statText: new ig.Font( 'media/04b03.font.png' ),
                showStats: false,
                statMatte: new ig.Image( 'media/stat-matte.png' ),
                levelTimer: new ig.Timer(),
                levelExit: null,
                stats: {times: 0, kills: 0, deaths: 0, score_points: 0,},
                lives: 3,
                lifeSprite: new ig.Image('media/life-sprite.png'),
                loadLevel: function( data ) {
                    // console.log(data);
                    this.level = data.name;
                    this.stats = {time: 0, kills: 0, deaths: 0, score_points: 0,};
                    this.parent(data);
                    this.levelTimer.reset();
                },
                init: function() {
                    this.loadLevel( LevelStart1 );
                    playingArea = document.getElementById('playingArea');
             
                    // Bind keys
                    ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
                    ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
                    ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
                    ig.input.bind( ig.KEY.DOWN_ARROW, 'super' );
                    ig.input.bind( ig.KEY.C, 'shoot' );
                    ig.input.bind( ig.KEY.X, 'switchup' );
                    ig.input.bind( ig.KEY.Z, 'switchdown' );
                    ig.input.bind( ig.KEY.SPACE, 'continue');
            
            
                    // Align touch buttons to the screen size, if we have any
                    if( window.myTouchButtons ) {
                        window.myTouchButtons.align(); 
                    }
             
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
                        // level exit if level 1-4
                        if(ig.input.state('shoot') && this.level < 4){
                            console.log('exit levelll')
                            this.showStats = false;
                            this.levelExit.nextLevel();
                            this.parent();
                        }
                        // initiate the level exit into the "pong" screen
                        else if(ig.input.state('shoot') && this.level === 2){
                            console.log('exit 4')
                            ig.system.setGame(StartScreen5);
                    }
                        
                    }
                },
                draw: function() {
                    // Draw all entities and backgroundMaps
                    this.parent();
                    // gem
                    this.font.draw( 'Gems: ' + this.score_points, 6, 20,);
            
                    // this.statText.draw("Lives", 5,5); <-- this adds the "lives" text
                    for(var i=0; i < this.lives; i++)
                    this.lifeSprite.draw(((this.lifeSprite.width +2) * i)+5, 9);
                    // 'this.player' is set by the player's init method
                    // player exit
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
                        this. statText.draw('Gems: '+this.stats.score_points, x, y+60, ig.Font.ALIGN.CENTER);
                        this. statText.draw( 'Press C to continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
                    }
                    if( window.myTouchButtons ) {
                        window.myTouchButtons.draw(); 
                    }
                },
                toggleStats: function( levelExit ) {
                    this.showStats = true;
                    this.stats.time = Math.round(this.levelTimer.delta());
                    this.levelExit = levelExit;
                },
                    gameOver: function(){
                    ig.finalStats = ig.game.stats;
                    ig.system.setGame(GameOverScreen);
                },
                });
            
window.addEventListener('resize', function(){
	// If the game hasn't started yet, there's nothing to do here
	if( !ig.system ) { return; }

    e=e || this.window.event;
    pauseEvent(e);
	
	// Also repositon the touch buttons, if we have any
	if( window.myTouchButtons ) {
		window.myTouchButtons.align(); 
	}
}, false);

function pauseEvent(e){
    if(e.stopPropagation) e.stopePropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

// mobile touchpad
if( ig.ua.mobile ) {
	// Use the TouchButton Plugin to create a TouchButtonCollection that we
	// can draw in our game classes.
	
	// Touch buttons are anchored to either the left or right and top or bottom
	// screen edge.
	var buttonImage = new ig.Image( 'media/touch-buttons_small_all.png' );
	myTouchButtons = new ig.TouchButtonCollection([
		new ig.TouchButton( 'left', {left: 0, bottom: 0}, 64, 64, buttonImage, 0 ),
		new ig.TouchButton( 'right', {left: 64, bottom: 0}, 64, 64, buttonImage, 1 ),
        
        new ig.TouchButton( 'switchup', {left: 0, bottom: 128}, 64, 64, buttonImage, 5 ),
		new ig.TouchButton( 'switchdown', {left: 0, bottom: 64}, 64, 64, buttonImage, 6 ),
        // A button
		new ig.TouchButton( 'jump', {right: 0, bottom: 64}, 64, 64, buttonImage, 2 ),
        // B button
		new ig.TouchButton( 'continue', {right: 64, bottom: 0}, 64, 64, buttonImage, 3 ),
        // B button
		new ig.TouchButton( 'shoot', {right: 0, bottom: 0}, 64, 64, buttonImage, 4 )
	]);
}
if( ig.ua.mobile ) {
	// Use the TouchButton Plugin to create a TouchButtonCollection that we
	// can draw in our game classes.
	
	// Touch buttons are anchored to either the left or right and top or bottom
	// screen edge.
	var buttonImage2 = new ig.Image( 'media/touch-buttons_small_all.png' );
	myTouchButtons2 = new ig.TouchButtonCollection2([
		new ig.TouchButton2( 'left', {left: 0, bottom: 0}, 64, 64, buttonImage2, 0 ),
		new ig.TouchButton2( 'right', {left: 64, bottom: 0}, 64, 64, buttonImage2, 1 ),
        
        new ig.TouchButton2( 'up', {left: 0, top: 0}, 64, 64, buttonImage2, 0 ),
		new ig.TouchButton2( 'down', {left: 0, top: 64}, 64, 64, buttonImage2, 1 ),
        // A button
		new ig.TouchButton2( 'jump', {right: 0, bottom: 50}, 64, 64, buttonImage2, 2 ),
        // B button
		new ig.TouchButton2( 'continue', {right: 50, bottom: 0}, 64, 64, buttonImage2, 3 ),
        // B button
		new ig.TouchButton2( 'shoot', {right: 0, bottom: 0}, 64, 64, buttonImage2, 3 )
	]);
}

StartScreen = ig.Game.extend( {
        mainCharacter: new ig.Image( 'media/roads2.png' ),
        title: new ig.Image( 'media/game-title.png' ),
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image( 'media/screen-bg.png' ),
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'continue' );
        // Align touch buttons to the screen size, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.align(); 
		}
        },
        update: function() {
            if(ig.input.pressed ('continue')) {
                ig.system.setGame(MyGame1)
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            this.mainCharacter.draw(0,0);
            var x = ig.system.width/2,
            y = ig.system.height - 15;
            this.instructText.draw( 'Press Spacebar To Start', x+3, y-36,
            ig.Font.ALIGN.CENTER );
            if( window.myTouchButtons ) {
                window.myTouchButtons.draw(); 
            }
        }
    });

    // instruction
     
StartScreen5 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/instruction.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'continue' );
        if( window.myTouchButtons ) {
            window.myTouchButtons.align(); 
        }
    },
    update: function() {
        if(ig.input.pressed ('continue')) {
            ig.system.setGame(MyGame2)
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
        if( window.myTouchButtons ) {
            window.myTouchButtons.draw(); 
        }
    }
});

StartScreen6 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/instruction.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'continue' );
        if( window.myTouchButtons ) {
            window.myTouchButtons.align(); 
        }
    },
    update: function() {
        if(ig.input.pressed ('continue')) {
            ig.system.setGame(MyGame3)
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
        if( window.myTouchButtons ) {
            window.myTouchButtons.draw(); 
        }
    }
});

StartScreen2 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/face3.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'continue' );
        if( window.myTouchButtons ) {
            window.myTouchButtons.align(); 
        }
    },
    update: function() {
        if(ig.input.pressed ('continue')) {
            ig.system.setGame(MyGame3)
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
        if( window.myTouchButtons ) {
            window.myTouchButtons.draw(); 
        }
    }
});
StartScreen3 = ig.Game.extend( {
    mainCharacter: new ig.Image( 'media/desert_screen.png' ),
    // title: new ig.Image( 'media/gradient.png' ),
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image( 'media/gradient.png' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'continue' );
        if( window.myTouchButtons ) {
            window.myTouchButtons.align(); 
        }
    },
    update: function() {
        if(ig.input.pressed ('continue')) {
            ig.system.setGame(MyGame3)
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
        if( window.myTouchButtons ) {
            window.myTouchButtons.draw(); 
        }
    }
});
// game over
GameOverScreen = ig.Game.extend({
    instructText: new ig.Font('media/04b03.font.png'),
    background: new ig.Image('media/screen-bg.png'),
    gameOver: new ig.Image('media/game-over.png'),
    states: {},
    init: function(){
        ig.input.bind(ig.KEY.C, 'cont');
        this.stats = ig.finalStats;
        if( window.myTouchButtons ) {
			window.myTouchButtons.align(); 
		}
    },
    update: function(){
        if(ig.input.pressed('cont')){
            ig.system.setGame(StartScreen)
        }
        this.parent();
    },
    draw: function(){
        this.parent();
        this.background.draw(0,0);
        var x = ig.system.width/2
        var y = ig.system.height/2-20;
        this.gameOver.draw(x - (this.gameOver.width*.5), y-30);
        var score = (this.stats.kills*100) - (this.stats.deaths*50) +(this.stats.score_points*20);
        this.instructText.draw('Total Kills: '+this.stats.kills, x, y+30, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Total Deaths: '+this.stats.deaths, x, y+40,
        ig.Font.ALIGN.CENTER);
        this.instructText.draw('Score: '+score, x, y+50, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Gems: '+this.stats.score_points, x, y+60, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Press C To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
        if( window.myTouchButtons ) {
            window.myTouchButtons.draw(); 
        }
    }
})

// ig.main( '#canvas', StartScreen2, 60, 500, 220, 3 );
 
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
// ig.main( '#canvas', StartScreen, 60, 500, 220, 3 );
ig.main( '#canvas', StartScreen, 60, 467, 220, 3 );
 
});
