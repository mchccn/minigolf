import { ctx } from ".";
import { Point, rotate } from "./utils";

export default class Obstacle {
    public vertices: [Point, Point, Point, Point];

    constructor(public x: number, public y: number, public w: number, public h: number, public a: number) {
        this.vertices = [
            [x - w / 2, y - h / 2],
            [x - w / 2, y + h / 2],
            [x + w / 2, y + h / 2],
            [x + w / 2, y - h / 2],
        ];

        for (const v of this.vertices) rotate(v, [x, y], a);
    }

    public update() {
        this.draw();
    }

    public draw() {
        ctx.fillStyle = "black";

        ctx.beginPath();

        ctx.moveTo(this.vertices[0][0], this.vertices[0][1]);

        for (const [x, y] of this.vertices.slice(1)) ctx.lineTo(x, y);

        ctx.closePath();

        ctx.fill();
    }
}
