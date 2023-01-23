ig.module( 'game.levels.pong3' )
.requires( 'impact.image','game.entities.paddle-player','game.entities.levelexit' )
.defines(function(){
LevelPong3=/*JSON[*/{
	"name": 1,
	"entities": [
		{
			"type": "EntityPaddlePlayer",
			"x": 40,
			"y": 28
		},
		{
			"type": "EntityLevelexit",
			"x": 96,
			"y": 48,
			"settings": {
				"level": "pong3"
			}
		},
		{
			"type": "EntityLevelexit",
			"x": 104,
			"y": 16,
			"settings": {
				"level": "pong"
			}
		}
	],
	"layer": [
		{
			"name": "main",
			"width": 16,
			"height": 10,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/tileset.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 8,
			"foreground": false,
			"data": [
				[4,152,151,4,4,4,4,4,4,4,4,4,4,4,4,4],
				[4,151,3,151,4,1,3,3,3,3,3,3,1,81,4,4],
				[6,3,4,151,5,5,5,1,3,3,3,4,4,151,2,2],
				[6,3,151,4,3,3,3,3,3,5,1,3,1,81,2,2],
				[6,6,3,151,3,1,3,1,1,3,3,3,5,4,2,2],
				[6,151,151,151,3,5,3,1,3,3,1,81,81,4,2,2],
				[6,6,3,3,3,5,5,5,3,5,1,1,151,1,2,2],
				[6,6,3,1,3,3,3,3,1,3,3,81,3,1,2,2],
				[4,4,3,3,3,1,3,3,3,3,3,81,81,3,4,4],
				[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
			]
		},
		{
			"name": "collision",
			"width": 16,
			"height": 10,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 8,
			"foreground": false,
			"data": [
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
			]
		}
	]
}/*]JSON*/;
LevelPong3Resources=[new ig.Image('media/tileset.png')];
});