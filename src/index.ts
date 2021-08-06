import levels from "./levels";
import Vector from "./Vector";

const canvas = document.querySelector("canvas")!;
export const ctx = canvas.getContext("2d")!;
canvas.width = 1600;
canvas.height = 900;

const EPOCH = Date.now();

let Δ = 0;
let Ω = 0;

let level = 0;

let { player, obstacles } = levels[level];

function update(γ: number) {
    if (isPaused) return;

    const θ = γ / 1000;

    Δ = θ - Ω;

    Ω = θ;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    obstacles.forEach((obstacle) => obstacle.update());

    if (mouse.isDown) {
        ctx.strokeStyle = "white";

        ctx.moveTo(player.pos.x, player.pos.y);
        ctx.lineTo(player.pos.x + (mouse.x - mouse.ox), player.pos.y + (mouse.y - mouse.oy));

        ctx.stroke();
    }

    player.update();
}

let isPaused = false;

setInterval(() => update(Date.now() - EPOCH), 1000 / 60);

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

    if (isClick) return;

    player.acc.add(new Vector(-mouse.x + mouse.ox, -mouse.y + mouse.oy).divide(100));
    player.vel.add(new Vector(-mouse.x + mouse.ox, -mouse.y + mouse.oy).divide(1000));
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
