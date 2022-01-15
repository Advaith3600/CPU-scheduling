export class Scene {
    constructor(el) {
        this.el = document.querySelector(el);
    }

    load() {
        this.el.classList.add('loaded');
    }

    unload() {
        this.el.classList.remove('loaded');
        this.el.classList.add('unloading');
        setTimeout(() => this.el.classList.remove('unloading'), 500);
    }
}