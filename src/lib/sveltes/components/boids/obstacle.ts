import * as PIXI from 'pixi.js';

export class obstacle {
    public element: PIXI.Graphics;
    public x: number;
    public y: number;
    public radius: number;

    constructor(x: number, y: number, radius = 10) {
        this.element = new PIXI.Graphics();
        this.element.beginFill(0xffffff);
        this.element.drawCircle(0, 0, radius);
        this.element.endFill();

        this.element.x = x;
        this.element.y = y;

        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}