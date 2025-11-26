export class Enemy {
    constructor(x, y, type = 'goomba') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 32;
        this.height = 32;
        this.velocityX = type === 'hamster' ? -1.5 : -1;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.maxFallSpeed = 15;
        this.onGround = false;
        this.isDead = false;
        this.deadTimer = 0;
        this.frame = 0;
        this.isFriendly = type === 'hamster';
        this.collected = false;
    }

    update(level) {
        this.frame++;

        if (this.isDead) {
            this.deadTimer++;
            if (this.deadTimer > 30) {
                return true;
            }
            return false;
        }

        this.velocityY += this.gravity;
        if (this.velocityY > this.maxFallSpeed) {
            this.velocityY = this.maxFallSpeed;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.onGround = false;
        this.checkCollisions(level);

        if (this.y > 600) {
            return true;
        }

        return false;
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
                        this.resolveCollision(tileX, tileY, tileSize, tileSize);
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

    resolveCollision(tileX, tileY, tileWidth, tileHeight) {
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
        } else if (minOverlap === overlapLeft || minOverlap === overlapRight) {
            this.velocityX *= -1;
        }
    }

    die() {
        this.isDead = true;
        this.deadTimer = 0;
    }
}
