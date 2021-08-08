import Hole from "./Hole";
import Obstacle from "./Obstacle";
import Player from "./Player";

const levels = [
    {
        player: new Player(800, 450, 20, Infinity),
        obstacles: [new Obstacle(100, 100, 100, 100, 1)],
        hole: new Hole(800, 800, 25),
    },
    {
        player: new Player(200, 600, 17.5, Infinity),
        obstacles: [],
        hole: new Hole(1200, 100, 22.5),
    },
];

export default levels;
