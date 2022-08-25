import { CanvasDriver, Input, Engine, StageScaleMode, Debug, Renderer, Black, Message } from "black-engine";
import Stats from "stats-js";
import { Game } from "./game";

// Game will be our starting class and rendering will be done on Canvas
const engine = new Engine('container', Game, CanvasDriver, [Input]);

// Pause simulation when container loses focus
engine.pauseOnBlur = false;

// Pause simulation when page is getting hidden
engine.pauseOnHide = false;

// Wroom, wroom!
engine.start();

// Set default stage size
engine.stage.setSize(800, 600);

const stats = new Stats()
stats.showPanel(0);
document.body.appendChild(stats.dom);

const animate = () => {
	stats.begin();
	// monitored code goes here
	stats.end();
	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

