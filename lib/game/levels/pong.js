ig.module( 'game.levels.pong' )
.requires( 'impact.image','game.entities.levelexit','game.entities.paddle-player','game.entities.poison' )
.defines(function(){
LevelPong=/*JSON[*/{
	"name": 1,
	"entities": [
		{
			"type": "EntityLevelexit",
			"x": 112,
			"y": 64,
			"settings": {
				"level": "pong2"
			}
		},
		{
			"type": "EntityPaddlePlayer",
			"x": 28,
			"y": 16
		},
		{
			"type": "EntityLevelexit",
			"x": 8,
			"y": 64,
			"settings": {
				"level": "dorm1"
			}
		},
		{
			"type": "EntityPoison",
			"x": 0,
			"y": 4
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
				[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
				[4,4,3,1,1,1,3,3,3,3,3,3,1,1,1,4],
				[6,6,3,3,5,5,5,1,3,3,3,3,3,3,1,2],
				[6,6,1,5,3,3,3,3,3,5,1,3,1,3,2,2],
				[6,6,1,3,3,1,3,1,1,3,3,3,5,3,2,2],
				[6,6,3,3,3,5,3,1,3,3,1,1,3,3,2,2],
				[6,6,3,3,3,5,5,5,3,5,1,1,1,1,2,2],
				[6,177,3,1,3,3,3,3,1,3,3,1,3,1,33,2],
				[4,177,3,3,3,1,3,3,3,3,3,3,3,3,57,4],
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
LevelPongResources=[new ig.Image('media/tileset.png')];
});