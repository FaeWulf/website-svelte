import * as PIXI from 'pixi.js';
import type { Rect } from '@timohausmann/quadtree-js';

export class boids implements Rect {
    public element: PIXI.Graphics;
    public speed: number;
    private angle: number;
    public minX: number;
    public maxX: number;
    public minY: number;
    public maxY: number;

    //boudings
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public debugText: PIXI.Text;
    public velocity = 1;
    public visionRadius: number;
    public visionAngle: number;
    public localRadius: number;
    public rivalRadius: number;
    public flockRadius: number;

    public ignoreRule1 = false;
    public ignoreRule2 = false;
    public ignoreRule3 = false;
    public ignoreRuleRival = false;
    public boidType = 1;

    constructor(x: number, y: number, speed: number, angle: number, width: number, height: number, type: number) {
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

        this.x = x;
        this.y = y;
        this.element.x = x;
        this.element.y = y;
        this.width = 1;
        this.height = 1;


        this.visionRadius = 20;
        this.visionAngle = 120;

        //radius to get all boids around element
        this.localRadius = 80;
        this.rivalRadius = 100;
        this.flockRadius = 0;

        this.debugText = new PIXI.Text(this.angle.toFixed(0), {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xff1010,
            align: 'center'
        });

        this.debugText.x = this.element.x + 100;
        this.debugText.y = this.element.y + 100;
    }

    public getAngle() {
        return this.angle;
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

    public getAngleCounterClockwise() {
        return (this.angle + 180 + 90) % 360;
    }

    public setSandBox(width: number, height: number) {
        this.minX = 0;
        this.maxX = width;
        this.minY = 0;
        this.maxY = height;
    }
    public update(delta: number, border: boolean) {


        this.element.x += Math.sin(this.angle * (Math.PI / 180)) * this.speed * this.velocity * delta;
        this.element.y += -Math.cos(this.angle * (Math.PI / 180)) * this.speed * this.velocity * delta;

        //this.element.tint = 0x00bb00;

        if (border) {
            //custom rules
            // no border
            if (this.element.x < this.minX) {
                //this.element.x = this.maxX;
                this.element.x += 5
                this.setAngle(this.getAngle() + 180);
            }
            if (this.element.x > this.maxX) {
                //this.element.x = this.minX;
                this.element.x -= 5
                this.setAngle(this.getAngle() + 180);
            }
            if (this.element.y < this.minY) {
                // this.element.y = this.maxY;
                this.element.y += 5
                this.setAngle(this.getAngle() + 180);
            }
            if (this.element.y > this.maxY) {
                // this.element.y = this.minY;
                this.element.y -= 5
                this.setAngle(this.getAngle() + 180);
            }
        }
        else {
            if (this.element.x < 0) this.element.x = this.maxX;
            if (this.element.x > this.maxX) this.element.x = this.minX;
            if (this.element.y < 0) this.element.y = this.maxY;
            if (this.element.y > this.maxY) this.element.y = this.minY;
        }


        this.x = this.element.x
        this.y = this.element.y

        //this.debugText.text = this.getAngleCounterClockwise().toFixed(0);
        this.debugText.text = (this.speed * this.velocity).toFixed(2);
        this.debugText.x = this.element.x + 20;
        this.debugText.y = this.element.y + 20;

        //random rotate
        if (!this.ignoreRule1 && !this.ignoreRule2 && !this.ignoreRule3 && !this.ignoreRuleRival)
            if ((Math.random() * 8 < 1)) {
                this.setAngle(this.getAngle() + ((Math.random() * 5 < 2) ? 5 * delta : -5 * delta))
            }
    }
}