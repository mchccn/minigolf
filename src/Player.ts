import { ctx } from ".";
import Vector from "./Vector";

export default class Player {
    public acc = new Vector(0, 0);
    public vel = new Vector(0, 0);
    public pos = new Vector(this.x, this.y);
    public stopped = true;
    public shots = 0;

    constructor(private x: number, private y: number, public r: number, public max: number) {}

    public update() {
        this.vel.add(this.acc);

        this.pos.add(this.vel);

        this.acc.multiply(0.5);

        this.vel.multiply(0.975);

        if (this.pos.x < 0 + this.r) {
            this.pos.x = 0 + this.r;
            this.vel.x *= -0.975;
            this.acc.x *= 0.975;
        } else if (this.pos.x > ctx.canvas.width - this.r) {
            this.pos.x = ctx.canvas.width - this.r;
            this.vel.x *= -0.975;
            this.acc.x *= 0.975;
        }

        if (this.pos.y < 0 + this.r) {
            this.pos.y = 0 + this.r;
            this.vel.y *= -0.975;
            this.acc.y *= 0.975;
        } else if (this.pos.y > ctx.canvas.height - this.r) {
            this.pos.y = ctx.canvas.height - this.r;
            this.vel.y *= -0.975;
            this.acc.y *= 0.975;
        }

        this.stopped = this.vel.magnitude < 1;

        this.draw();
    }

    public draw() {
        ctx.fillStyle = "white";

        ctx.beginPath();

        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, false);

        ctx.closePath();

        ctx.fill();
    }

    public shoot(v: Vector) {
        this.acc.add(v.divide(100));
        this.vel.add(v.multiply(5));

        this.shots++;

        if (this.shots > this.max) this.reset();
    }

    public reset() {
        this.acc = new Vector(0, 0);
        this.vel = new Vector(0, 0);
        this.pos = new Vector(this.x, this.y);
        this.stopped = true;
        this.shots = 0;
    }
}
