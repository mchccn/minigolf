export type Point = [x: number, y: number];

export function rotate(p: Point, t: Point, a: number) {
    const s = Math.sin(a);
    const c = Math.cos(a);

    p[0] -= t[0];
    p[1] -= t[1];

    const nx = p[0] * c - p[1] * s;
    const ny = p[0] * s + p[1] * c;

    p[0] = nx + t[0];
    p[1] = ny + t[1];

    return p;
}
