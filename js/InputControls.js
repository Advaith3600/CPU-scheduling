export const InputControls = {
    data() {
        return {
            process: {},
            processes: []
        }
    },
    methods: {
        reset() {
            this.process = {
                burst: 0,
                priority: 0,
                arrival: 0
            }
        },
        addProcess() {
            this.processes.push({ ...this.process });
            this.reset();
        },
        visualize() {
            const processes = this.processes.map((p, i) => (p.id = i + 1, p));
            window.engine.load('visualize', processes);
        }
    },
    created() {
        this.reset();
    }
}