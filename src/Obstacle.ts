import { ctx } from ".";

function rotate([cx, cy]: [cx: number, cy: number], a: number) {
    return [cx * Math.cos(a) - cy * Math.sin(a), cy * Math.cos(a) + cx * Math.sin(a)];
}

export default class Obstacle {
    public vertices = [];

    constructor(public x: number, public y: number, public width: number, public height: number, a: number) {
        this.vertices = [];
    }

    public update() {
        this.draw();
    }

    public draw() {
        ctx.fillStyle = "black";

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
