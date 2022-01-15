export class Engine {
    constructor(scenes, initial, args = []) {
        this.scenes = scenes;
        this.load(initial, ...args);
    }

    load(scene, ...args) {
        if (this.scene) this.scenes[this.scene].unload();

        this.scene = scene;
        this.scenes[scene].load(...args);
    }
}