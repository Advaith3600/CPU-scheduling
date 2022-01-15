import { Engine } from "./Engine.js";
import { InputScene } from "./scenes/InputScene.js";
import { VisualizeScene } from "./scenes/VisualizeScene.js";

const initial = 'input', args = [];

const engine = window.engine = new Engine({
    input: new InputScene,
    visualize: new VisualizeScene
}, initial, args);