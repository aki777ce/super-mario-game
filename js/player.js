export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 2.5;
        this.jumpPower = 14;
        this.gravity = 0.5;
        this.maxFallSpeed = 15;
        this.onGround = false;
        this.jumping = false;
        this.walking = false;
        this.facingLeft = false;
        this.frame = 0;
        this.isDead = false;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.isPoweredUp = false;
        this.baseSpeed = 2.5;
        this.baseJumpPower = 14;
    }

    update(keys, level) {
        this.frame++;
        
        if (this.isDead) {
            this.velocityY += this.gravity;
            this.y += this.velocityY;
            return;
        }

        if (this.invincible) {
            this.invincibleTimer--;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }

        this.velocityX = 0;
        this.walking = false;

        const currentSpeed = this.isPoweredUp ? this.baseSpeed * 1.5 : this.baseSpeed;
        const currentJumpPower = this.isPoweredUp ? this.baseJumpPower * 1.3 : this.baseJumpPower;

        if (keys.left) {
            this.velocityX = -currentSpeed;
            this.facingLeft = true;
            this.walking = true;
        }
        if (keys.right) {
            this.velocityX = currentSpeed;
            this.facingLeft = false;
            this.walking = true;
        }

        if (keys.shift && this.walking && !this.isPoweredUp) {
            this.velocityX *= 1.5;
        }

        if (keys.space && this.onGround) {
            this.velocityY = -currentJumpPower;
            this.onGround = false;
            this.jumping = true;
        }

        if (!keys.space && this.velocityY < 0) {
            this.velocityY *= 0.85;
        }

        this.velocityY += this.gravity;
        if (this.velocityY > this.maxFallSpeed) {
            this.velocityY = this.maxFallSpeed;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.onGround = false;

        this.checkCollisions(level);

        if (this.velocityY >= 0) {
            this.jumping = false;
        }

        if (this.y > 600) {
            this.die();
        }
    }

    checkCollisions(level) {
        const tileSize = 32;
        const startCol = Math.floor(this.x / tileSize);
        const endCol = Math.floor((this.x + this.width) / tileSize);
        const startRow = Math.floor(this.y / tileSize);
        const endRow = Math.floor((this.y + this.height) / tileSize);

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const tile = level.getTile(col, row);
                
                if (tile && tile.solid) {
                    const tileX = col * tileSize;
                    const tileY = row * tileSize;
                    
                    if (this.intersects(tileX, tileY, tileSize, tileSize)) {
                        this.resolveCollision(tileX, tileY, tileSize, tileSize, tile, col, row, level);
                    }
                }
            }
        }
    }

    intersects(x, y, width, height) {
        return this.x < x + width &&
               this.x + this.width > x &&
               this.y < y + height &&
               this.y + this.height > y;
    }

    resolveCollision(tileX, tileY, tileWidth, tileHeight, tile, col, row, level) {
        const overlapLeft = (this.x + this.width) - tileX;
        const overlapRight = (tileX + tileWidth) - this.x;
        const overlapTop = (this.y + this.height) - tileY;
        const overlapBottom = (tileY + tileHeight) - this.y;

        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        if (minOverlap === overlapTop && this.velocityY > 0) {
            this.y = tileY - this.height;
            this.velocityY = 0;
            this.onGround = true;
        } else if (minOverlap === overlapBottom && this.velocityY < 0) {
            this.y = tileY + tileHeight;
            this.velocityY = 0;
            
            if (tile.type === 'question' && !tile.isEmpty) {
                level.hitBlock(col, row);
            } else if (tile.type === 'brick') {
                level.breakBrick(col, row);
            }
        } else if (minOverlap === overlapLeft) {
            this.x = tileX - this.width;
            this.velocityX = 0;
        } else if (minOverlap === overlapRight) {
            this.x = tileX + tileWidth;
            this.velocityX = 0;
        }
    }

    checkEnemyCollision(enemy) {
        if (this.isDead || enemy.isDead || enemy.collected) return null;

        const dx = (this.x + this.width / 2) - (enemy.x + enemy.width / 2);
        const dy = (this.y + this.height / 2) - (enemy.y + enemy.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (this.width + enemy.width) / 2) {
            if (enemy.isFriendly) {
                return 'collect';
            }
            
            if (this.invincible) return null;
            
            if (this.velocityY > 0 && this.y < enemy.y) {
                this.velocityY = -8;
                return 'stomp';
            } else {
                return 'hit';
            }
        }
        return null;
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.velocityY = -10;
        this.velocityX = 0;
    }

    makeInvincible(duration = 120) {
        this.invincible = true;
        this.invincibleTimer = duration;
    }

    powerUp() {
        this.isPoweredUp = true;
    }

    powerDown() {
        if (this.isPoweredUp) {
            this.isPoweredUp = false;
            this.makeInvincible(120);
            return true;
        }
        return false;
    }

    getState() {
        return {
            jumping: this.jumping,
            walking: this.walking,
            facingLeft: this.facingLeft
        };
    }
}
