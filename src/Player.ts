import { ctx } from ".";
import Vector from "./Vector";

export default class Player {
    public acc = new Vector(0, 0);
    public vel = new Vector(0, 0);
    public pos = new Vector(this.x, this.y);
    public stopped = true;

    constructor(private x: number, private y: number, public r: number) {}

    public update() {
        this.vel.add(this.acc);

        this.pos.add(this.vel);

        this.acc.multiply(0.5);

        this.vel.multiply(0.975 + this.vel.clone().magnitude / 1000);

        this.stopped = !this.vel.x && !this.vel.y;

        this.draw();
    }

    public draw() {
        ctx.fillStyle = "white";

        ctx.beginPath();

        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, false);

        ctx.closePath();

        ctx.fill();
    }
}
