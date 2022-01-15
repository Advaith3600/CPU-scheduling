import { Scene } from "./Scene.js";

export class VisualizeScene extends Scene {
    constructor() {
        super('#visualize');
    }

    load(processes) {
        super.load();
        console.log(processes);
    }
}