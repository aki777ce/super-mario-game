import { Enemy } from './enemy.js';

export class Level2 {
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
        this.isCave = true;
        
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
            this.tiles[0][col] = { type: 'cave_ceiling', solid: true };
            this.tiles[1][col] = { type: 'cave_ceiling', solid: true };
        }

        for (let col = 0; col < this.width; col++) {
            this.tiles[17][col] = { type: 'cave_ground', solid: true };
            this.tiles[18][col] = { type: 'cave_ground', solid: true };
        }

        this.addCavePlatform(15, 13, 8);
        this.addCavePlatform(30, 10, 6);
        this.addCavePlatform(45, 13, 10);
        this.addCavePlatform(65, 11, 7);
        this.addCavePlatform(80, 14, 5);
        this.addCavePlatform(95, 12, 8);
        this.addCavePlatform(110, 10, 6);
        this.addCavePlatform(125, 13, 9);
        this.addCavePlatform(145, 11, 7);
        this.addCavePlatform(160, 14, 6);

        this.addQuestionBlocks(20, 13, 1, true);
        this.addQuestionBlocks(35, 10, 2, false);
        this.addQuestionBlocks(50, 13, 1, false);
        this.addQuestionBlocks(70, 11, 1, true);
        this.addQuestionBlocks(100, 12, 2, false);
        this.addQuestionBlocks(130, 13, 1, true);
        this.addQuestionBlocks(150, 11, 1, false);

        this.addBricks(22, 13, 3);
        this.addBricks(52, 13, 4);
        this.addBricks(85, 14, 3);
        this.addBricks(115, 10, 4);
        this.addBricks(147, 11, 2);

        this.addStalactite(25, 2, 3);
        this.addStalactite(40, 2, 4);
        this.addStalactite(55, 2, 2);
        this.addStalactite(75, 2, 5);
        this.addStalactite(90, 2, 3);
        this.addStalactite(105, 2, 4);
        this.addStalactite(120, 2, 2);
        this.addStalactite(140, 2, 3);
        this.addStalactite(155, 2, 4);
        this.addStalactite(170, 2, 3);

        this.addStalagmite(28, 17, 2);
        this.addStalagmite(48, 17, 3);
        this.addStalagmite(68, 17, 2);
        this.addStalagmite(88, 17, 3);
        this.addStalagmite(108, 17, 2);
        this.addStalagmite(128, 17, 3);
        this.addStalagmite(148, 17, 2);
        this.addStalagmite(168, 17, 3);

        this.createGap(60, 3);
        this.createGap(92, 2);
        this.createGap(122, 3);
        this.createGap(155, 2);

        this.enemies.push(new Enemy(18 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(25 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(33 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(42 * this.tileSize, 15 * this.tileSize, 'hamster'));
        this.enemies.push(new Enemy(48 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(58 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(68 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(78 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(85 * this.tileSize, 15 * this.tileSize, 'hamster'));
        this.enemies.push(new Enemy(98 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(105 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(118 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(128 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(138 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(145 * this.tileSize, 15 * this.tileSize, 'hamster'));
        this.enemies.push(new Enemy(158 * this.tileSize, 15 * this.tileSize, 'goomba'));
        this.enemies.push(new Enemy(168 * this.tileSize, 15 * this.tileSize, 'goomba'));

        this.decorations.push({ type: 'flag', x: 185 * this.tileSize, y: 7 * this.tileSize, height: 10 * this.tileSize });
        this.decorations.push({ type: 'castle', x: 190 * this.tileSize, y: 13 * this.tileSize });
    }

    addCavePlatform(startCol, row, width) {
        for (let i = 0; i < width; i++) {
            this.tiles[row][startCol + i] = { type: 'cave_ground', solid: true };
        }
    }

    addStalactite(col, startRow, length) {
        for (let i = 0; i < length; i++) {
            this.tiles[startRow + i][col] = { 
                type: 'stalactite', 
                solid: false,
                isTop: i === 0,
                isBottom: i === length - 1
            };
        }
    }

    addStalagmite(col, row, height) {
        for (let i = 0; i < height; i++) {
            this.tiles[row - i][col] = { 
                type: 'stalagmite', 
                solid: true,
                isTop: i === height - 1,
                isBottom: i === 0
            };
        }
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
