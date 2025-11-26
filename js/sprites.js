export class Sprites {
    static TILE_SIZE = 16;
    static SCALE = 2;

    static drawMario(ctx, x, y, state, frame, isPoweredUp = false) {
        const size = this.TILE_SIZE * this.SCALE;
        
        ctx.save();
        
        if (state.facingLeft) {
            ctx.translate(x + size, y);
            ctx.scale(-1, 1);
            x = 0;
            y = 0;
        }

        if (state.jumping) {
            this.drawMarioJump(ctx, x, y, isPoweredUp);
        } else if (state.walking) {
            this.drawMarioWalk(ctx, x, y, frame, isPoweredUp);
        } else {
            this.drawMarioStand(ctx, x, y, isPoweredUp);
        }
        
        ctx.restore();
    }

    static drawMarioStand(ctx, x, y, isPoweredUp = false) {
        const s = this.SCALE;
        const hatColor = isPoweredUp ? '#ffdd00' : '#ff0000';
        const shirtColor = isPoweredUp ? '#ffdd00' : '#ff0000';
        
        ctx.fillStyle = hatColor;
        ctx.fillRect(x + 4*s, y + 0*s, 8*s, 4*s);
        
        ctx.fillStyle = '#ffccaa';
        ctx.fillRect(x + 4*s, y + 4*s, 8*s, 4*s);
        
        ctx.fillStyle = shirtColor;
        ctx.fillRect(x + 2*s, y + 8*s, 12*s, 4*s);
        
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(x + 4*s, y + 12*s, 8*s, 8*s);
        
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 2*s, y + 20*s, 5*s, 4*s);
        ctx.fillRect(x + 9*s, y + 20*s, 5*s, 4*s);
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 5*s, y + 5*s, 2*s, 2*s);
        ctx.fillRect(x + 9*s, y + 5*s, 2*s, 2*s);
    }

    static drawMarioWalk(ctx, x, y, frame, isPoweredUp = false) {
        const s = this.SCALE;
        const offset = Math.floor(frame / 10) % 2;
        const hatColor = isPoweredUp ? '#ffdd00' : '#ff0000';
        const shirtColor = isPoweredUp ? '#ffdd00' : '#ff0000';
        
        ctx.fillStyle = hatColor;
        ctx.fillRect(x + 4*s, y + 0*s, 8*s, 4*s);
        
        ctx.fillStyle = '#ffccaa';
        ctx.fillRect(x + 4*s, y + 4*s, 8*s, 4*s);
        
        ctx.fillStyle = shirtColor;
        ctx.fillRect(x + 2*s, y + 8*s, 12*s, 4*s);
        
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(x + 4*s, y + 12*s, 8*s, 8*s);
        
        if (offset === 0) {
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x + 2*s, y + 20*s, 5*s, 4*s);
            ctx.fillRect(x + 9*s, y + 20*s, 5*s, 4*s);
        } else {
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x + 4*s, y + 20*s, 4*s, 4*s);
            ctx.fillRect(x + 8*s, y + 20*s, 4*s, 4*s);
        }
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 5*s, y + 5*s, 2*s, 2*s);
        ctx.fillRect(x + 9*s, y + 5*s, 2*s, 2*s);
    }

    static drawMarioJump(ctx, x, y, isPoweredUp = false) {
        const s = this.SCALE;
        const hatColor = isPoweredUp ? '#ffdd00' : '#ff0000';
        const shirtColor = isPoweredUp ? '#ffdd00' : '#ff0000';
        
        ctx.fillStyle = hatColor;
        ctx.fillRect(x + 4*s, y + 0*s, 8*s, 4*s);
        
        ctx.fillStyle = '#ffccaa';
        ctx.fillRect(x + 4*s, y + 4*s, 8*s, 4*s);
        ctx.fillRect(x + 0*s, y + 8*s, 4*s, 4*s);
        ctx.fillRect(x + 12*s, y + 8*s, 4*s, 4*s);
        
        ctx.fillStyle = shirtColor;
        ctx.fillRect(x + 4*s, y + 8*s, 8*s, 4*s);
        
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(x + 4*s, y + 12*s, 8*s, 8*s);
        
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 2*s, y + 20*s, 5*s, 4*s);
        ctx.fillRect(x + 9*s, y + 20*s, 5*s, 4*s);
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 5*s, y + 5*s, 2*s, 2*s);
        ctx.fillRect(x + 9*s, y + 5*s, 2*s, 2*s);
    }

    static drawGoomba(ctx, x, y, frame, isDead) {
        const s = this.SCALE;
        
        if (isDead) {
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x + 2*s, y + 12*s, 12*s, 4*s);
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 4*s, y + 13*s, 2*s, 2*s);
            ctx.fillRect(x + 10*s, y + 13*s, 2*s, 2*s);
            return;
        }

        const offset = Math.floor(frame / 15) % 2;
        
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 2*s, y + 0*s, 12*s, 8*s);
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 4*s, y + 2*s, 2*s, 2*s);
        ctx.fillRect(x + 10*s, y + 2*s, 2*s, 2*s);
        ctx.fillRect(x + 3*s, y + 0*s, 10*s, 1*s);
        
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 2*s, y + 8*s, 12*s, 6*s);
        
        if (offset === 0) {
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x + 0*s, y + 14*s, 4*s, 2*s);
            ctx.fillRect(x + 12*s, y + 14*s, 4*s, 2*s);
        } else {
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x + 2*s, y + 14*s, 4*s, 2*s);
            ctx.fillRect(x + 10*s, y + 14*s, 4*s, 2*s);
        }
    }

    static drawBrick(ctx, x, y) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#c84c0c';
        ctx.fillRect(x, y, 16*s, 16*s);
        
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 0*s, y + 0*s, 16*s, 1*s);
        ctx.fillRect(x + 0*s, y + 8*s, 16*s, 1*s);
        ctx.fillRect(x + 0*s, y + 0*s, 1*s, 8*s);
        ctx.fillRect(x + 8*s, y + 0*s, 1*s, 8*s);
        ctx.fillRect(x + 4*s, y + 8*s, 1*s, 8*s);
        ctx.fillRect(x + 12*s, y + 8*s, 1*s, 8*s);
    }

    static drawQuestionBlock(ctx, x, y, frame, isEmpty) {
        const s = this.SCALE;
        
        if (isEmpty) {
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(x, y, 16*s, 16*s);
            ctx.fillStyle = '#654321';
            ctx.fillRect(x + 2*s, y + 2*s, 12*s, 12*s);
            return;
        }

        const offset = Math.floor(frame / 20) % 2;
        const yOffset = offset * s;
        
        ctx.fillStyle = '#ffaa00';
        ctx.fillRect(x, y - yOffset, 16*s, 16*s);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 6*s, y + 3*s - yOffset, 4*s, 2*s);
        ctx.fillRect(x + 7*s, y + 5*s - yOffset, 2*s, 4*s);
        ctx.fillRect(x + 7*s, y + 10*s - yOffset, 2*s, 2*s);
        
        ctx.fillStyle = '#ffdd00';
        ctx.fillRect(x + 2*s, y + 2*s - yOffset, 2*s, 2*s);
        ctx.fillRect(x + 12*s, y + 2*s - yOffset, 2*s, 2*s);
        ctx.fillRect(x + 2*s, y + 12*s - yOffset, 2*s, 2*s);
        ctx.fillRect(x + 12*s, y + 12*s - yOffset, 2*s, 2*s);
    }

    static drawGround(ctx, x, y) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#c84c0c';
        ctx.fillRect(x, y, 16*s, 16*s);
        
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x + 0*s, y + 0*s, 16*s, 1*s);
        ctx.fillRect(x + 0*s, y + 0*s, 1*s, 16*s);
    }

    static drawPipe(ctx, x, y, height) {
        const s = this.SCALE;
        const pipeHeight = height * 16 * s;
        
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(x, y, 32*s, pipeHeight);
        
        ctx.fillStyle = '#006600';
        ctx.fillRect(x + 4*s, y + 4*s, 8*s, pipeHeight - 8*s);
        ctx.fillRect(x + 20*s, y + 4*s, 8*s, pipeHeight - 8*s);
        
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(x - 2*s, y - 4*s, 36*s, 8*s);
        ctx.fillStyle = '#006600';
        ctx.fillRect(x + 2*s, y, 28*s, 4*s);
    }

    static drawCoin(ctx, x, y, frame) {
        const s = this.SCALE;
        const coinFrame = Math.floor(frame / 10) % 4;
        
        ctx.fillStyle = '#ffaa00';
        
        if (coinFrame === 0 || coinFrame === 2) {
            ctx.fillRect(x + 4*s, y + 2*s, 8*s, 12*s);
            ctx.fillRect(x + 2*s, y + 4*s, 12*s, 8*s);
        } else if (coinFrame === 1) {
            ctx.fillRect(x + 6*s, y + 2*s, 4*s, 12*s);
            ctx.fillRect(x + 4*s, y + 4*s, 8*s, 8*s);
        } else {
            ctx.fillRect(x + 7*s, y + 2*s, 2*s, 12*s);
            ctx.fillRect(x + 5*s, y + 4*s, 6*s, 8*s);
        }
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 7*s, y + 6*s, 2*s, 4*s);
    }

    static drawCloud(ctx, x, y) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 8*s, y + 0*s, 16*s, 8*s);
        ctx.fillRect(x + 0*s, y + 4*s, 32*s, 8*s);
        ctx.fillRect(x + 4*s, y + 8*s, 24*s, 4*s);
    }

    static drawBush(ctx, x, y) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(x + 8*s, y + 0*s, 16*s, 8*s);
        ctx.fillRect(x + 0*s, y + 4*s, 32*s, 8*s);
        ctx.fillRect(x + 4*s, y + 8*s, 24*s, 4*s);
    }

    static drawFlag(ctx, x, y, poleHeight) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(x + 7*s, y, 2*s, poleHeight);
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x + 9*s, y + 8*s, 12*s, 8*s);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 9*s, y + 8*s, 6*s, 4*s);
        ctx.fillRect(x + 15*s, y + 12*s, 6*s, 4*s);
        
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(x, y + poleHeight, 16*s, 2*s);
    }

    static drawCaveGround(ctx, x, y) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(x, y, 16*s, 16*s);
        
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x + 0*s, y + 0*s, 16*s, 1*s);
        ctx.fillRect(x + 0*s, y + 0*s, 1*s, 16*s);
        
        ctx.fillStyle = '#5a5a5a';
        ctx.fillRect(x + 3*s, y + 3*s, 2*s, 2*s);
        ctx.fillRect(x + 8*s, y + 7*s, 2*s, 2*s);
        ctx.fillRect(x + 12*s, y + 4*s, 2*s, 2*s);
    }

    static drawCaveCeiling(ctx, x, y) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#3a3a3a';
        ctx.fillRect(x, y, 16*s, 16*s);
        
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x + 0*s, y + 15*s, 16*s, 1*s);
        ctx.fillRect(x + 15*s, y + 0*s, 1*s, 16*s);
        
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(x + 4*s, y + 5*s, 2*s, 2*s);
        ctx.fillRect(x + 10*s, y + 9*s, 2*s, 2*s);
        ctx.fillRect(x + 7*s, y + 12*s, 2*s, 2*s);
    }

    static drawStalactite(ctx, x, y, isTop, isBottom) {
        const s = this.SCALE;
        
        if (isTop) {
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(x + 4*s, y, 8*s, 16*s);
            ctx.fillStyle = '#5a5a5a';
            ctx.fillRect(x + 5*s, y + 2*s, 6*s, 12*s);
        } else if (isBottom) {
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(x + 4*s, y, 8*s, 12*s);
            ctx.fillRect(x + 6*s, y + 12*s, 4*s, 4*s);
            ctx.fillStyle = '#5a5a5a';
            ctx.fillRect(x + 5*s, y + 2*s, 6*s, 8*s);
        } else {
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(x + 4*s, y, 8*s, 16*s);
            ctx.fillStyle = '#5a5a5a';
            ctx.fillRect(x + 5*s, y, 6*s, 16*s);
        }
    }

    static drawStalagmite(ctx, x, y, isTop, isBottom) {
        const s = this.SCALE;
        
        if (isTop) {
            ctx.fillStyle = '#4a4a4a';
            ctx.fillRect(x + 6*s, y, 4*s, 4*s);
            ctx.fillRect(x + 4*s, y + 4*s, 8*s, 12*s);
            ctx.fillStyle = '#5a5a5a';
            ctx.fillRect(x + 5*s, y + 6*s, 6*s, 8*s);
        } else if (isBottom) {
            ctx.fillStyle = '#4a4a4a';
            ctx.fillRect(x + 4*s, y, 8*s, 16*s);
            ctx.fillStyle = '#5a5a5a';
            ctx.fillRect(x + 5*s, y + 2*s, 6*s, 12*s);
        } else {
            ctx.fillStyle = '#4a4a4a';
            ctx.fillRect(x + 4*s, y, 8*s, 16*s);
            ctx.fillStyle = '#5a5a5a';
            ctx.fillRect(x + 5*s, y, 6*s, 16*s);
        }
    }

    static drawCastle(ctx, x, y) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#808080';
        ctx.fillRect(x + 16*s, y + 32*s, 32*s, 32*s);
        
        ctx.fillRect(x + 8*s, y + 40*s, 16*s, 24*s);
        ctx.fillRect(x + 40*s, y + 40*s, 16*s, 24*s);
        
        ctx.fillRect(x + 0*s, y + 48*s, 8*s, 16*s);
        ctx.fillRect(x + 56*s, y + 48*s, 8*s, 16*s);
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 24*s, y + 48*s, 16*s, 16*s);
        
        ctx.fillStyle = '#654321';
        ctx.fillRect(x + 4*s, y + 48*s, 4*s, 4*s);
        ctx.fillRect(x + 56*s, y + 48*s, 4*s, 4*s);
        ctx.fillRect(x + 12*s, y + 40*s, 4*s, 4*s);
        ctx.fillRect(x + 48*s, y + 40*s, 4*s, 4*s);
        ctx.fillRect(x + 20*s, y + 32*s, 4*s, 4*s);
        ctx.fillRect(x + 40*s, y + 32*s, 4*s, 4*s);
    }

    static drawMushroom(ctx, x, y) {
        const s = this.SCALE;
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x + 2*s, y + 0*s, 12*s, 8*s);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 4*s, y + 2*s, 3*s, 3*s);
        ctx.fillRect(x + 9*s, y + 2*s, 3*s, 3*s);
        
        ctx.fillStyle = '#ffccaa';
        ctx.fillRect(x + 4*s, y + 8*s, 8*s, 8*s);
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 6*s, y + 10*s, 1*s, 1*s);
        ctx.fillRect(x + 9*s, y + 10*s, 1*s, 1*s);
    }

    static drawHamster(ctx, x, y, frame) {
        const s = this.SCALE;
        const offset = Math.floor(frame / 15) % 2;
        
        ctx.fillStyle = '#c8a882';
        ctx.fillRect(x + 2*s, y + 6*s, 12*s, 8*s);
        
        ctx.fillStyle = '#e6d4b8';
        ctx.fillRect(x + 3*s, y + 7*s, 10*s, 6*s);
        
        ctx.fillStyle = '#c8a882';
        ctx.fillRect(x + 10*s, y + 3*s, 5*s, 6*s);
        
        ctx.fillStyle = '#e6d4b8';
        ctx.fillRect(x + 11*s, y + 4*s, 3*s, 4*s);
        
        ctx.fillStyle = '#c8a882';
        ctx.fillRect(x + 12*s, y + 1*s, 2*s, 2*s);
        ctx.fillRect(x + 12*s, y + 7*s, 2*s, 2*s);
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 11*s, y + 5*s, 2*s, 1*s);
        
        ctx.fillStyle = '#ffc0cb';
        ctx.fillRect(x + 13*s, y + 6*s, 2*s, 1*s);
        
        ctx.fillStyle = '#8b6f47';
        ctx.fillRect(x + 4*s, y + 8*s, 2*s, 2*s);
        ctx.fillRect(x + 7*s, y + 9*s, 2*s, 2*s);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 5*s, y + 9*s, 1*s, 1*s);
        ctx.fillRect(x + 8*s, y + 10*s, 1*s, 1*s);
        
        if (offset === 0) {
            ctx.fillStyle = '#c8a882';
            ctx.fillRect(x + 3*s, y + 14*s, 2*s, 2*s);
            ctx.fillRect(x + 6*s, y + 14*s, 2*s, 2*s);
            ctx.fillRect(x + 9*s, y + 14*s, 2*s, 2*s);
            ctx.fillRect(x + 12*s, y + 14*s, 2*s, 2*s);
        } else {
            ctx.fillStyle = '#c8a882';
            ctx.fillRect(x + 4*s, y + 14*s, 2*s, 2*s);
            ctx.fillRect(x + 7*s, y + 14*s, 2*s, 2*s);
            ctx.fillRect(x + 10*s, y + 14*s, 2*s, 2*s);
            ctx.fillRect(x + 11*s, y + 14*s, 2*s, 2*s);
        }
        
        ctx.fillStyle = '#8b6f47';
        ctx.fillRect(x + 1*s, y + 9*s, 2*s, 1*s);
    }
}
