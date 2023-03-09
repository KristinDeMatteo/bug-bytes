import Phaser from 'phaser';
import PlayerController from './PlayerController';
import dudeImg from './assets/femaleSpriteSheet4.png';
import dudeImgRev from './assets/femaleSpriteSheet4Rev.png';
import enemyImg from './assets/bugBytesV2.png';
import enemyImgRev from './assets/bugBytesV2Rev.png';
import groundImg from './assets/platform.png';
import skyImg from './assets/sky.png';
import bgImg1 from './assets/level_1_bg_1.png';
import bgImg2 from './assets/level_1_bg_2.png';
import invisWall from './assets/leftBorder.png';
import spikes from './assets/spikes.png';
import mainHelloWorld from './assets/mainHelloWorld.png';
import mainHelloWorldBubble from './assets/mainHelloWorldBubble.png';
import mainHelloWorldBubble2 from './assets/mainHelloWorldBubble2.png';
import mainHelloWorldBubble3 from './assets/mainHelloWorldBubble3.png';
import mainHelloWorldBubble4 from './assets/mainHelloWorldBubble4.png';
import mainHelloWorldBubble5 from './assets/mainHelloWorldBubble5.png';
import heart from './assets/heart.png';

class HealthBar {
    constructor (scene)
    {
        this.x = 60;
        this.y = -10;
        this.scale = .13;

        this.hearts = scene.physics.add.staticGroup();
        this.h1 = this.hearts.create(this.x, this.y, 'heart').setOrigin(0).setScale(this.scale).refreshBody().setScrollFactor(0);
        this.h2 = this.hearts.create(this.x + 60, this.y, 'heart').setOrigin(0).setScale(this.scale).refreshBody().setScrollFactor(0);
        this.h3 = this.hearts.create(this.x + 120, this.y, 'heart').setOrigin(0).setScale(this.scale).refreshBody().setScrollFactor(0);

    }
    update(playerHealth)
    {
        if (playerHealth == 1) {
            this.h1.visible = true;
            this.h2.visible = false;
            this.h3.visible = false;
        }
        if (playerHealth == 2) {
            this.h1.visible = true;
            this.h2.visible = true;
            this.h3.visible = false;
        }
        if (playerHealth == 3) {
            this.h1.visible = true;
            this.h2.visible = true;
            this.h3.visible = true;
        }
    }
}

class Level extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('sky', skyImg);
        this.load.image('ground', groundImg);
        this.load.spritesheet('dude', dudeImg, { frameWidth: 75, frameHeight: 75 });
        this.load.spritesheet('dudeRev', dudeImgRev, { frameWidth: 75, frameHeight: 75 });
        this.load.spritesheet('enemy', enemyImg, { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('enemyRev', enemyImgRev, { frameWidth: 80, frameHeight: 80 });
        this.load.image('bg1', bgImg1);
        this.load.image('bg2', bgImg2);
        this.load.image('invisWall', invisWall);
        this.load.image('spikes', spikes);
        this.load.image('mainHelloWorld', mainHelloWorld);
        this.load.image('mainHelloWorldBubble', mainHelloWorldBubble);
        this.load.image('mainHelloWorldBubble2', mainHelloWorldBubble2);
        this.load.image('mainHelloWorldBubble3', mainHelloWorldBubble3);
        this.load.image('mainHelloWorldBubble4', mainHelloWorldBubble4);
        this.load.image('mainHelloWorldBubble5', mainHelloWorldBubble5);
        this.load.image('heart', heart);
    }
      
    create ()
    {
        //  Set the camera and physics bounds
        this.cameras.main.setBounds(0, 0, 800, 1129 * 2);
        this.physics.world.setBounds(0, 0, 800, 1129 * 2);   
        
        this.add.image(0, 0, 'bg1').setOrigin(0);
        // 1129 is the height of first bg image
        this.add.image(0, 1129, 'bg2').setOrigin(0);

        this.invisWall = this.physics.add.staticGroup();
        this.invisWall.create(0, 0, 'invisWall').setOrigin(0).refreshBody();
        this.invisWall.create(0, 1129, 'invisWall').setOrigin(0).refreshBody();
        
        // Add platforms as their own physics group
        this.platforms = this.physics.add.staticGroup();
        // Add spikes as their own physics group
        this.spikes = this.physics.add.staticGroup();

        //This is the deadly platform (for spikes)
        this.spikes.create(450, 400, 'spikes').setOrigin(0).refreshBody();
        this.spikes.create(75, 1129 * 2 - 48, 'spikes').setOrigin(0).refreshBody();
        this.spikes.create(172, 1129 * 2 - 48, 'spikes').setOrigin(0).refreshBody();
        this.spikes.create(172 * 2, 1129 * 2 - 48, 'spikes').setOrigin(0).refreshBody();
        this.spikes.create(172 * 3, 1129 * 2 - 48, 'spikes').setOrigin(0).refreshBody();
        this.spikes.create(172 * 4, 1129 * 2 - 48, 'spikes').setOrigin(0).refreshBody();


        this.platforms.create(75, 207, 'mainHelloWorld').setOrigin(0).refreshBody();
        this.platforms.create(475, 500, 'mainHelloWorldBubble').refreshBody();
        this.platforms.create(75, 720, 'mainHelloWorldBubble2').setOrigin(0).refreshBody();
        this.platforms.create(75, 1000, 'mainHelloWorldBubble3').setOrigin(0).refreshBody();
        this.platforms.create(540, 1300, 'mainHelloWorldBubble4').refreshBody();
        //this.platforms.create(300, 1500, 'mainHelloWorldBubble5').refreshBody();
        this.platforms.create(500, 1700, 'mainHelloWorldBubble5').refreshBody();
        this.platforms.create(300, 1900, 'mainHelloWorldBubble5').refreshBody();
        this.platforms.create(500, 2100, 'mainHelloWorldBubble5').refreshBody();

        this.player = this.physics.add.sprite(100, 100, 'dude');
        this.player.setSize(50, 75, true);
        // this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //Add setup for player health and display healthbar
        this.player.health = 3;
        this.player.immune = false;
        this.HealthBar = new HealthBar(this, this.player.health);

        this.cameras.main.startFollow(this.player);
        
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.invisWall);

        // Add collision event with player and spikes 
        this.physics.add.collider(this.player, this.spikes, () =>  {
            // Return if player is immune 
            if (this.player.immune) {return;}
            
            // Make player immune for 2 seconds
            this.player.immune = true;
            setTimeout(() => this.player.immune = false, 2000);

            this.player.health--;
            this.HealthBar.update(this.player.health);
            // If the player's health hits 0, scene restarts
            if (this.player.health <= 0) {this.scene.restart();}
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dudeRev', { start: 16, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 5 } ],
            frameRate: 10
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 11, end: 16 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.playerController = new PlayerController(this.player);
        this.playerController.setState('idle');

        // enemy controls
        let enemy1 = this.physics.add.sprite(100, 100, 'enemy').setVelocity(100, -100);
        enemy1.setSize(100, 55, true);
        this.physics.add.collider(enemy1, this.platforms);
        this.tweens.timeline({
            targets: enemy1.body.velocity,
            loop: -1,
            tweens: [
                { x: 150, duration: 2000, ease: 'Stepped' },
                { x: -150, duration: 2000, ease: 'Stepped'}
            ]
        });

        // Add collision event with player and the enemy
        this.physics.add.collider(this.player, enemy1, () =>  {
            //return if player is immune
            if (this.player.immune) {return;}
            
            // Make player immune for 2 seconds
            this.player.immune = true;
            setTimeout(() => this.player.immune = false, 2000);


            // TODO: This is optional
            // Detroy enemy after a collision
            enemy1.destroy();

            this.player.health--;
            this.HealthBar.update(this.player.health);
            if (this.player.health <= 0) {this.scene.restart();}
        });

        let movingPlatform = this.physics.add.image(300, 1500, 'mainHelloWorldBubble5')
        .setImmovable(true)
        .setVelocity(100, -100)

        movingPlatform.body.setAllowGravity(false)

        this.tweens.timeline({
        targets: movingPlatform.body.velocity,
        loop: -1,
        tweens: [
            { x:    150, y: 0, duration: 2000, ease: 'Stepped' },
            { x:    -150, y: 0, duration: 2000, ease: 'Stepped' },
        ]
        });

        this.physics.add.collider(movingPlatform, this.player)
    }

    update() 
    {
        if (this.cursors.left.isDown) {
            this.playerController.setState('moveLeft');
        }
        else if (this.cursors.right.isDown) {
            this.playerController.setState('moveRight');
        } else {
            this.playerController.setState('idle');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-400);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Level,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
};

const game = new Phaser.Game(config);
