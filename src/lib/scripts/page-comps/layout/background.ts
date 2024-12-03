//define some oops shit
export interface bgItem {
    x: number;
    y: number;
    size: number;
    speed: number;

    reset(width: number, height: number): any;
    update(bgCtx: CanvasRenderingContext2D, width: number, height: number): any;
}

//start class
export class Star implements bgItem {
    x: number;
    y: number;
    size: number;
    speed: number;

    constructor(options: { x: number; y: number }) {
        this.size = Math.random() * 1.8 + 0.2;
        this.speed = Math.random() * 0.05;
        this.x = options.x;
        this.y = options.y;
    }

    reset(width: number, height: number) {
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.05;
        this.x = width;
        this.y = Math.random() * height;
    }

    update(bgCtx: CanvasRenderingContext2D, width: number, height: number) {
        this.x -= this.speed;
        if (this.x < 0) {
            this.reset(width, height);
        } else {
            bgCtx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
}

//shooting star
export class ShootingStar implements bgItem {
    x: number = 0;
    y: number = 0;
    size: number = 0;
    speed: number = 0;
    len: number = 0;
    waitTime: number = 0;
    active: boolean = false;

    constructor(width: number, height: number) {
        this.reset(width, height);
    }

    reset(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = 0;
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.size = Math.random() * 1 + 0.1;

        // shooting start delay
        this.waitTime = new Date().getTime() + Math.random() * 3000 + 500;
        this.active = false;
    }

    update(bgCtx: CanvasRenderingContext2D, width: number, height: number) {
        if (this.active) {
            this.x -= this.speed;
            this.y += this.speed;
            if (this.x < 0 || this.y >= height) {
                this.reset(width, height);
            } else {
                bgCtx.lineWidth = this.size;
                bgCtx.beginPath();
                bgCtx.moveTo(this.x, this.y);
                bgCtx.lineTo(this.x + this.len, this.y - this.len);
                bgCtx.stroke();
            }
        } else {
            if (this.waitTime < new Date().getTime()) {
                this.active = true;
            }
        }
    }
}