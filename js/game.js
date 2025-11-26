import { Player } from './player.js';
import { Level } from './level.js';
import { Level2 } from './level2.js';
import { Sprites } from './sprites.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        this.ctx.imageSmoothingEnabled = false;
        
        this.gameState = 'start';
        this.score = 0;
        this.coins = 0;
        this.lives = 3;
        
        this.keys = {
            left: false,
            right: false,
            space: false,
            shift: false
        };
        
        this.cameraX = 0;
        this.frame = 0;
        
        this.player = null;
        this.level = null;
        this.floatingTexts = [];
        this.currentStage = 1;
        
        this.setupEventListeners();
        this.gameLoop();
    }

    setupEventListeners() {
        document.getElementById('stage1-btn').addEventListener('click', () => {
            this.startGame(1);
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') this.keys.left = true;
            if (e.code === 'ArrowRight') this.keys.right = true;
            if (e.code === 'Space') {
                e.preventDefault();
                this.keys.space = true;
                
                if (this.gameState === 'gameover' || this.gameState === 'clear') {
                    this.resetGame();
                }
            }
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                this.keys.shift = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft') this.keys.left = false;
            if (e.code === 'ArrowRight') this.keys.right = false;
            if (e.code === 'Space') this.keys.space = false;
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                this.keys.shift = false;
            }
        });
    }

    startGame(stage = 1, keepScore = false) {
        this.gameState = 'playing';
        if (!keepScore) {
            this.score = 0;
            this.coins = 0;
            this.lives = 3;
        }
        this.cameraX = 0;
        this.frame = 0;
        this.currentStage = stage;
        
        this.player = new Player(100, 400);
        this.level = stage === 2 ? new Level2() : new Level();
        
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-over-screen').style.display = 'none';
        document.getElementById('clear-screen').style.display = 'none';
        document.getElementById('stage-transition').style.display = 'none';
    }

    resetGame() {
        this.gameState = 'start';
        this.currentStage = 1;
        document.getElementById('start-screen').style.display = 'block';
        document.getElementById('game-over-screen').style.display = 'none';
        document.getElementById('clear-screen').style.display = 'none';
        document.getElementById('stage-transition').style.display = 'none';
    }

    gameOver() {
        this.gameState = 'gameover';
        document.getElementById('game-over-screen').style.display = 'block';
    }

    stageClear() {
        this.gameState = 'clear';

        if (this.currentStage === 1) {
            document.getElementById('stage-transition').style.display = 'block';
            setTimeout(() => {
                document.getElementById('stage-transition').style.display = 'none';
                this.startGame(2, true);
            }, 2000);
        } else {
            document.getElementById('clear-screen').style.display = 'block';
            document.getElementById('final-score').textContent = `SCORE: ${this.score.toString().padStart(6, '0')}`;
        }
    }

    update() {
        if (this.gameState !== 'playing') return;

        this.frame++;
        
        this.player.update(this.keys, this.level);
        this.level.update();

        if (this.player.x > 400) {
            this.cameraX = this.player.x - 400;
        }

        const maxCameraX = (this.level.width * 32) - this.canvas.width;
        if (this.cameraX > maxCameraX) {
            this.cameraX = maxCameraX;
        }

        this.level.enemies.forEach(enemy => {
            const collision = this.player.checkEnemyCollision(enemy);
            if (collision === 'collect') {
                enemy.collected = true;
                this.score += 1000;
                this.floatingTexts.push({
                    text: '1000',
                    x: enemy.x + enemy.width / 2,
                    y: enemy.y,
                    velocityY: -2,
                    life: 60
                });
            } else if (collision === 'stomp') {
                enemy.die();
                this.score += 100;
            } else if (collision === 'hit') {
                const wasPoweredDown = this.player.powerDown();
                if (!wasPoweredDown) {
                    this.lives--;
                    if (this.lives <= 0) {
                        this.player.die();
                        setTimeout(() => this.gameOver(), 2000);
                    } else {
                        this.player = new Player(100, 400);
                        this.level = this.currentStage === 2 ? new Level2() : new Level();
                        this.cameraX = 0;
                    }
                }
            }
        });

        this.level.coins.forEach(coin => {
            if (!coin.collected) {
                const dx = this.player.x - coin.x;
                const dy = this.player.y - coin.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 40) {
                    coin.collected = true;
                    this.coins++;
                    this.score += 100;
                }
            }
        });

        this.level.mushrooms.forEach(mushroom => {
            if (!mushroom.collected) {
                const dx = (this.player.x + this.player.width / 2) - (mushroom.x + mushroom.width / 2);
                const dy = (this.player.y + this.player.height / 2) - (mushroom.y + mushroom.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 30) {
                    mushroom.collected = true;
                    this.player.powerUp();
                    this.score += 1000;
                }
            }
        });

        if (this.level.isGoalReached(this.player.x, this.player.width)) {
            setTimeout(() => this.stageClear(), 1000);
        }

        this.floatingTexts.forEach(text => {
            text.y += text.velocityY;
            text.life--;
        });
        this.floatingTexts = this.floatingTexts.filter(text => text.life > 0);

        if (this.player.isDead && this.player.y > 700) {
            this.lives--;
            if (this.lives <= 0) {
                setTimeout(() => this.gameOver(), 500);
            } else {
                this.player = new Player(100, 400);
                this.level = this.currentStage === 2 ? new Level2() : new Level();
                this.cameraX = 0;
            }
        }
    }

    draw() {
        const bgColor = this.level && this.level.isCave ? '#1a1a1a' : '#5c94fc';
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.level || !this.player) {
            this.updateUI();
            return;
        }

        this.ctx.save();
        this.ctx.translate(-this.cameraX, 0);

        if (!this.level.isCave) {
            this.level.decorations.forEach(deco => {
                if (deco.x - this.cameraX > -100 && deco.x - this.cameraX < this.canvas.width + 100) {
                    if (deco.type === 'cloud') {
                        Sprites.drawCloud(this.ctx, deco.x, deco.y);
                    } else if (deco.type === 'bush') {
                        Sprites.drawBush(this.ctx, deco.x, deco.y);
                    }
                }
            });
        }

        this.level.decorations.forEach(deco => {
            if (deco.x - this.cameraX > -100 && deco.x - this.cameraX < this.canvas.width + 100) {
                if (deco.type === 'flag') {
                    Sprites.drawFlag(this.ctx, deco.x, deco.y, deco.height);
                } else if (deco.type === 'castle') {
                    Sprites.drawCastle(this.ctx, deco.x, deco.y);
                }
            }
        });

        const startCol = Math.floor(this.cameraX / 32);
        const endCol = Math.ceil((this.cameraX + this.canvas.width) / 32);

        for (let row = 0; row < this.level.height; row++) {
            for (let col = startCol; col < endCol && col < this.level.width; col++) {
                const tile = this.level.getTile(col, row);
                if (tile) {
                    const x = col * 32;
                    const y = row * 32;
                    
                    if (tile.type === 'ground') {
                        Sprites.drawGround(this.ctx, x, y);
                    } else if (tile.type === 'cave_ground') {
                        Sprites.drawCaveGround(this.ctx, x, y);
                    } else if (tile.type === 'cave_ceiling') {
                        Sprites.drawCaveCeiling(this.ctx, x, y);
                    } else if (tile.type === 'stalactite') {
                        Sprites.drawStalactite(this.ctx, x, y, tile.isTop, tile.isBottom);
                    } else if (tile.type === 'stalagmite') {
                        Sprites.drawStalagmite(this.ctx, x, y, tile.isTop, tile.isBottom);
                    } else if (tile.type === 'brick') {
                        Sprites.drawBrick(this.ctx, x, y);
                    } else if (tile.type === 'question') {
                        Sprites.drawQuestionBlock(this.ctx, x, y, this.frame, tile.isEmpty);
                    } else if (tile.type === 'pipe' && tile.pipeTop) {
                        Sprites.drawPipe(this.ctx, x, y, tile.pipeHeight);
                    }
                }
            }
        }

        this.level.coins.forEach(coin => {
            if (!coin.collected) {
                Sprites.drawCoin(this.ctx, coin.x, coin.y, coin.frame);
            }
        });

        this.level.mushrooms.forEach(mushroom => {
            if (!mushroom.collected) {
                Sprites.drawMushroom(this.ctx, mushroom.x, mushroom.y);
            }
        });

        this.level.enemies.forEach(enemy => {
            if (!enemy.collected && enemy.x - this.cameraX > -50 && enemy.x - this.cameraX < this.canvas.width + 50) {
                if (enemy.type === 'goomba') {
                    Sprites.drawGoomba(this.ctx, enemy.x, enemy.y, enemy.frame, enemy.isDead);
                } else if (enemy.type === 'hamster') {
                    Sprites.drawHamster(this.ctx, enemy.x, enemy.y, enemy.frame);
                }
            }
        });

        if (this.player) {
            const blinkRate = 5;
            const shouldDraw = !this.player.invincible || Math.floor(this.frame / blinkRate) % 2 === 0;
            
            if (shouldDraw) {
                Sprites.drawMario(
                    this.ctx, 
                    this.player.x, 
                    this.player.y, 
                    this.player.getState(), 
                    this.frame,
                    this.player.isPoweredUp
                );
            }
        }

        this.floatingTexts.forEach(text => {
            this.ctx.save();
            this.ctx.translate(-this.cameraX, 0);
            this.ctx.fillStyle = '#ffff00';
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 3;
            this.ctx.font = 'bold 20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.strokeText(text.text, text.x, text.y);
            this.ctx.fillText(text.text, text.x, text.y);
            this.ctx.restore();
        });

        this.ctx.restore();

        this.updateUI();
    }

    updateUI() {
        document.getElementById('score').textContent = this.score.toString().padStart(6, '0');
        document.getElementById('coins').textContent = '×' + this.coins.toString().padStart(2, '0');
        document.getElementById('world').textContent = `1-${this.currentStage}`;
        document.getElementById('lives').textContent = '×' + this.lives.toString();
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

new Game();
