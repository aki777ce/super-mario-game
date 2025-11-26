import { Enemy } from './enemy.js';

export class Level {
    constructor() {
        this.tileSize = 32;
        this.width = 200;
        this.height = 19;
        this.tiles = [];
        this.enemies = [];
        this.coins = [];
        this.mushrooms = [];
        this.decorations = [];
        this.goalX = 185 * 32;
        this.flagPoleX = 185 * 32 + 7 * 2;
        
        this.initLevel();
    }

    initLevel() {
        for (let row = 0; row < this.height; row++) {
            this.tiles[row] = [];
            for (let col = 0; col < this.width; col++) {
                this.tiles[row][col] = null;
            }
        }

        for (let col = 0; col < this.width; col++) {
            this.tiles[17][col] = { type: 'ground', solid: true };
            this.tiles[18][col] = { type: 'ground', solid: true };
        }

        this.addQuestionBlocks(20, 13, 3, true);
        this.addBricks(16, 13, 5);
        
        this.addQuestionBlocks(25, 10, 1, true);
        this.addBricks(26, 10, 7);
        this.addQuestionBlocks(29, 10, 1, false);
        this.addQuestionBlocks(29, 13, 1, false);
        
        this.addBrickStairs(35, 16, 4);
        this.addBrickStairs(45, 16, 4, true);
        
        this.addBrickStairs(55, 16, 8);
        
        this.addPipe(30, 15, 2);
        this.addPipe(40, 14, 3);
        this.addPipe(50, 13, 4);
        this.addPipe(65, 13, 4);
        
        this.addQuestionBlocks(80, 13, 1, true);
        this.addBricks(81, 13, 2);
        this.addQuestionBlocks(83, 13, 1, false);
        this.addBricks(84, 13, 8);
        
        this.addFloatingBricks(100, 13, 3);
        this.addFloatingBricks(100, 10, 3);
        
        this.addBrickStairs(120, 16, 9);
        
        this.addPipe(140, 15, 2);
        
        this.addQuestionBlocks(150, 13, 1, false);
        this.addBricks(151, 13, 1);
        this.addQuestionBlocks(152, 13, 1, true);
        
        this.createGap(70, 2);
        this.createGap(90, 3);
        this.createGap(110, 3);
        this.createGap(160, 2);

        this.enemies.push(new Enemy(22 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(25 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(38 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(45 * this.tileSize, 15 * this.tileSize, 'hamster'));
        this.enemies.push(new Enemy(52 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(55 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(68 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(78 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(85 * this.tileSize, 15 * this.tileSize, 'hamster'));
        this.enemies.push(new Enemy(92 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(95 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(105 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(115 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(125 * this.tileSize, 15 * this.tileSize, 'hamster'));
        this.enemies.push(new Enemy(135 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(145 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(155 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(165 * this.tileSize, 15 * this.tileSize, 'goomba'));

        this.decorations.push({ type: 'cloud', x: 15 * this.tileSize, y: 3 * this.tileSize });
        this.decorations.push({ type: 'cloud', x: 35 * this.tileSize, y: 2 * this.tileSize });
        this.decorations.push({ type: 'cloud', x: 55 * this.tileSize, y: 4 * this.tileSize });
        this.decorations.push({ type: 'cloud', x: 75 * this.tileSize, y: 3 * this.tileSize });
        this.decorations.push({ type: 'cloud', x: 95 * this.tileSize, y: 2 * this.tileSize });
        this.decorations.push({ type: 'cloud', x: 115 * this.tileSize, y: 4 * this.tileSize });
        this.decorations.push({ type: 'cloud', x: 135 * this.tileSize, y: 3 * this.tileSize });
        this.decorations.push({ type: 'cloud', x: 155 * this.tileSize, y: 2 * this.tileSize });

        this.decorations.push({ type: 'bush', x: 12 * this.tileSize, y: 15 * this.tileSize });
        this.decorations.push({ type: 'bush', x: 42 * this.tileSize, y: 15 * this.tileSize });
        this.decorations.push({ type: 'bush', x: 72 * this.tileSize, y: 15 * this.tileSize });
        this.decorations.push({ type: 'bush', x: 102 * this.tileSize, y: 15 * this.tileSize });
        this.decorations.push({ type: 'bush', x: 132 * this.tileSize, y: 15 * this.tileSize });

        this.decorations.push({ type: 'flag', x: 185 * this.tileSize, y: 7 * this.tileSize, height: 10 * this.tileSize });
        this.decorations.push({ type: 'castle', x: 190 * this.tileSize, y: 13 * this.tileSize });
    }

    addQuestionBlocks(startCol, row, count, hasMushroom = false) {
        for (let i = 0; i < count; i++) {
            this.tiles[row][startCol + i] = { 
                type: 'question', 
                solid: true, 
                isEmpty: false,
                hasMushroom: hasMushroom && i === 0
            };
        }
    }

    addBricks(startCol, row, count) {
        for (let i = 0; i < count; i++) {
            this.tiles[row][startCol + i] = { 
                type: 'brick', 
                solid: true 
            };
        }
    }

    addFloatingBricks(startCol, row, count) {
        for (let i = 0; i < count; i++) {
            this.tiles[row][startCol + i] = { 
                type: 'brick', 
                solid: true 
            };
        }
    }

    addBrickStairs(startCol, startRow, steps, descending = false) {
        for (let i = 0; i < steps; i++) {
            const row = descending ? startRow + i : startRow - i;
            for (let j = 0; j <= i; j++) {
                if (row >= 0 && row < this.height) {
                    this.tiles[row][startCol + i] = { 
                        type: 'brick', 
                        solid: true 
                    };
                }
            }
        }
    }

    addPipe(col, row, height) {
        for (let i = 0; i < height; i++) {
            this.tiles[row + i][col] = { 
                type: 'pipe', 
                solid: true, 
                pipeHeight: height,
                pipeTop: i === 0 
            };
            this.tiles[row + i][col + 1] = { 
                type: 'pipe', 
                solid: true, 
                pipeHeight: height,
                pipeTop: i === 0 
            };
        }
    }

    createGap(startCol, width) {
        for (let col = startCol; col < startCol + width; col++) {
            this.tiles[17][col] = null;
            this.tiles[18][col] = null;
        }
    }

    getTile(col, row) {
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
            return null;
        }
        return this.tiles[row][col];
    }

    hitBlock(col, row) {
        const tile = this.getTile(col, row);
        if (tile && tile.type === 'question' && !tile.isEmpty) {
            tile.isEmpty = true;
            
            if (tile.hasMushroom) {
                this.mushrooms.push({
                    x: col * this.tileSize,
                    y: row * this.tileSize - this.tileSize,
                    velocityX: 1.5,
                    velocityY: -2,
                    width: 32,
                    height: 32,
                    collected: false
                });
            } else {
                this.coins.push({
                    x: col * this.tileSize,
                    y: row * this.tileSize,
                    velocityY: -8,
                    frame: 0,
                    collected: false
                });
            }
            return true;
        }
        return false;
    }

    breakBrick(col, row) {
        const tile = this.getTile(col, row);
        if (tile && tile.type === 'brick') {
            this.tiles[row][col] = null;
            return true;
        }
        return false;
    }

    update() {
        this.enemies = this.enemies.filter(enemy => {
            const shouldRemove = enemy.update(this);
            return !shouldRemove;
        });

        this.coins.forEach(coin => {
            if (!coin.collected) {
                coin.velocityY += 0.5;
                coin.y += coin.velocityY;
                coin.frame++;
                
                if (coin.frame > 30) {
                    coin.collected = true;
                }
            }
        });

        this.coins = this.coins.filter(coin => !coin.collected);

        this.mushrooms.forEach(mushroom => {
            if (!mushroom.collected) {
                mushroom.velocityY += 0.5;
                if (mushroom.velocityY > 15) mushroom.velocityY = 15;
                
                mushroom.x += mushroom.velocityX;
                mushroom.y += mushroom.velocityY;

                const tileSize = 32;
                const col = Math.floor(mushroom.x / tileSize);
                const row = Math.floor((mushroom.y + mushroom.height) / tileSize);
                const tile = this.getTile(col, row);
                
                if (tile && tile.solid) {
                    mushroom.y = row * tileSize - mushroom.height;
                    mushroom.velocityY = 0;
                }

                const leftCol = Math.floor(mushroom.x / tileSize);
                const rightCol = Math.floor((mushroom.x + mushroom.width) / tileSize);
                const midRow = Math.floor((mushroom.y + mushroom.height / 2) / tileSize);
                
                const leftTile = this.getTile(leftCol, midRow);
                const rightTile = this.getTile(rightCol, midRow);
                
                if (leftTile && leftTile.solid) {
                    mushroom.velocityX = Math.abs(mushroom.velocityX);
                } else if (rightTile && rightTile.solid) {
                    mushroom.velocityX = -Math.abs(mushroom.velocityX);
                }

                if (mushroom.y > 600) {
                    mushroom.collected = true;
                }
            }
        });

        this.mushrooms = this.mushrooms.filter(mushroom => !mushroom.collected);
    }

    isGoalReached(playerX, playerWidth) {
        return playerX + playerWidth >= this.flagPoleX;
    }
}
