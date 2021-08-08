import levels from "./levels";
import { Point, rotate } from "./utils";
import Vector from "./Vector";

const canvas = document.querySelector("canvas")!;
export const ctx = canvas.getContext("2d")!;
canvas.width = 1600;
canvas.height = 900;

const EPOCH = Date.now();

let Δ = 0;
let Ω = 0;

let level = 0;

let { player, obstacles, hole } = Object.create(levels[level]) as typeof levels[number];

let scored = false;

function update(γ: number) {
    if (isPaused) return;

    const θ = γ / 1000;

    Δ = θ - Ω;

    Ω = θ;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    obstacles.forEach((obstacle) => obstacle.update());

    hole.update();

    if (mouse.isDown && player.stopped) {
        ctx.strokeStyle = "white";

        ctx.beginPath();

        ctx.moveTo(player.pos.x, player.pos.y);
        ctx.lineTo(player.pos.x - mouse.x + mouse.ox, player.pos.y - mouse.y + mouse.oy);

        ctx.closePath();

        ctx.stroke();
    }

    player.update();

    obstacles.forEach((o) => {
        const circle = {
            x: player.pos.x - o.x,
            y: player.pos.y - o.y,
            r: player.r,
        };

        const rect = {
            x: 0,
            y: 0,
            vertices: o.vertices.map(([x, y]) => [x - o.x, y - o.y] as Point),
            w: o.w,
            h: o.w,
            a: o.a,
        };

        const [nrx, nry] = rotate([circle.x, circle.y], [rect.x, rect.y], -rect.a);

        circle.x = nrx;
        circle.y = nry;

        rect.vertices = rect.vertices.map((p) => rotate(p, [rect.x, rect.y], -rect.a));

        const intersecting = (() => {
            const dx = Math.abs(circle.x - rect.x);
            const dy = Math.abs(circle.y - rect.y);

            if (dx > rect.w / 2 + circle.r) return false;

            if (dy > rect.h / 2 + circle.r) return false;

            if (dx <= rect.w / 2) return true;

            if (dy <= rect.h / 2) return true;

            const d = Math.pow(dx - rect.w / 2, 2) + Math.pow(dy - rect.h / 2, 2);

            return d <= Math.pow(circle.r, 2);
        })();

        if (intersecting) {
            const r = new Vector(o.x, o.y);

            const d = Vector.subtract(player.pos, r);

            const ux = new Vector(Math.cos(o.a), Math.sin(o.a));
            const uy = new Vector(-Math.sin(o.a), Math.cos(o.a));

            const dx = Math.max(-o.w / 2, Math.min(Vector.dot(d, ux), o.w / 2));
            const dy = Math.max(-o.h / 2, Math.min(Vector.dot(d, uy), o.h / 2));

            const p = r.add(ux.multiply(dx).add(uy.multiply(dy)));

            const n = Vector.subtract(player.pos, p).normalized;

            const u = Vector.multiply(n, Vector.dot(player.vel, n));

            const w = Vector.subtract(player.vel, u);

            player.vel = Vector.subtract(w, u);
        }
    });

    const dx = hole.x - player.pos.x;
    const dy = hole.y - player.pos.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d < hole.r && !scored) {
        scored = true;

        player.update = () => {};

        setTimeout(() => {
            const l = Object.create(levels[++level]) as typeof levels[number];

            if (!l) {
                clearInterval(interval);

                return console.log("YOU WIN!");
            }

            player = l.player;
            obstacles = l.obstacles;
            hole = l.hole;

            scored = false;
        }, 250);
    }
}

let isPaused = false;

let interval = setInterval(() => update(Date.now() - EPOCH), 1000 / 60);

const mouse = {
    x: 0,
    y: 0,
    isDown: false,
    ox: 0,
    oy: 0,
    lastHeld: 0,
};

window.addEventListener("mousemove", (e) => {
    Object.assign(mouse, getMousePos(canvas, e));

    if (!mouse.isDown) {
        mouse.ox = mouse.x;
        mouse.oy = mouse.y;
    }
});

window.addEventListener("mousedown", (e) => {
    const { x, y } = getMousePos(canvas, e);

    const dx = x - player.pos.x;
    const dy = y - player.pos.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d > player.r) return;

    mouse.ox = mouse.x;
    mouse.oy = mouse.y;

    mouse.isDown = true;
    mouse.lastHeld = Date.now();
});

window.addEventListener("mouseup", () => {
    mouse.isDown = false;

    const isClick = mouse.x === mouse.ox && mouse.y === mouse.oy;

    if (isClick || !player.stopped) return;

    player.shoot(new Vector(-mouse.x + mouse.ox, -mouse.y + mouse.oy));
});

window.addEventListener("blur", () => {
    isPaused = true;
});

window.addEventListener("focus", () => {
    isPaused = false;
});

function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
    };
}
