import { Scene } from "./Scene.js";
import { InputControls } from "../InputControls.js";

export class InputScene extends Scene {
    constructor() {
        super('#input');
    }

    load() {
        super.load();

        this.app = Vue.createApp(InputControls).mount('#input');
    }
}