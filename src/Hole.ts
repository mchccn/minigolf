import { ctx } from ".";

export default class Hole {
    constructor(public x: number, public y: number, public r: number) {}

    public update() {
        this.draw();
    }

    public draw() {
        ctx.fillStyle = "black";

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

        ctx.closePath();

        ctx.fill();
    }
}
