export const InputControls = {
    data() {
        return {
            process: {},
            processes: [],
            quantum: 4
        }
    },
    methods: {
        reset() {
            this.process = {
                burst: 0,
                priority: 0,
                arrival: 0,
                system: 0
            }
        },
        addProcess() {
            this.processes.push({ ...this.process });
            this.reset();
        },
        visualize() {
            const processes = JSON.parse(JSON.stringify(this.processes.map((p, i) => (p.id = i + 1, p))));
            window.engine.load('visualize', processes, this.quantum);
        }
    },
    created() {
        this.reset();
    }
}