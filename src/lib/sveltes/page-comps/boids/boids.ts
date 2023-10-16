import * as PIXI from 'pixi.js';

export class boids {
    public element: PIXI.Graphics;
    public speed: number;
    private angle: number;
    private minX: number;
    private maxX: number;
    private minY: number;
    private maxY: number;

    public debugText: PIXI.Text;
    public velocity = 1;
    public visionRadius: number;
    public visionAngle: number;
    public localRadius: number;
    public rivalRadius: number;

    public boidType = 1;

    constructor(speed: number, angle: number, width: number, height: number, type: number) {
        this.element = new PIXI.Graphics();
        this.element.beginFill(0xffffff);
        this.element.drawPolygon(0, -20, -10, 20, 10, 20);
        this.element.endFill();

        this.element.scale.set(0.3);

        this.boidType = type;
        this.speed = speed;

        this.angle = angle;
        this.setAngle(angle);

        this.minX = 0;
        this.minY = 0;
        this.maxX = width;
        this.maxY = height;


        this.visionRadius = 20;
        this.visionAngle = 120;

        //radius to get all boids around element
        this.localRadius = 80;
        this.rivalRadius = 100;

        this.debugText = new PIXI.Text(this.angle.toFixed(0), {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xff1010,
            align: 'center'
        });

        this.debugText.x = this.element.x + 100;
        this.debugText.y = this.element.y + 100;
    }

    public setAngle(angle: number) {
        angle = angle % 360;

        if (angle < 0) {
            angle += 360;
        }

        this.angle = angle;
        this.element.angle = angle;
    }

    public setColor(color: number) {
        this.element.tint = color;
    }

    public getAngle() {
        return this.angle;
    }

    public getAngleCounterClockwise() {
        return (this.angle + 180 + 90) % 360;
    }

    public setSandBox(width: number, height: number) {
        this.minX = 0;
        this.maxX = width;
        this.minY = 0;
        this.maxY = height;
    }

    public update() {

        this.element.x += Math.sin(this.angle * (Math.PI / 180)) * this.speed * this.velocity;
        this.element.y += -Math.cos(this.angle * (Math.PI / 180)) * this.speed * this.velocity;

        //this.element.tint = 0x00bb00;

        //custom rules

        // no border
        if (this.element.x < this.minX) this.element.x = this.maxX;
        if (this.element.x > this.maxX) this.element.x = this.minX;
        if (this.element.y < this.minY) this.element.y = this.maxY;
        if (this.element.y > this.maxY) this.element.y = this.minY;


        this.debugText.text = this.getAngleCounterClockwise().toFixed(0);
        this.debugText.x = this.element.x + 20;
        this.debugText.y = this.element.y + 20;
    }
}