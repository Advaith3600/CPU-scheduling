import { Scene } from "./Scene.js";
import { SJF } from "../algorithms/SJF.js";
import { PS } from "../algorithms/PS.js";
import { RR } from "../algorithms/RR.js";
import { SRTF } from "../algorithms/SRTF.js";
import { FCFS } from "../algorithms/FCFS.js";
import { LJF } from "../algorithms/LJF.js";
import { LRTF } from "../algorithms/LRTF.js";

export class VisualizeScene extends Scene {
    constructor() {
        super('#visualize');

        $('#change-input').on('click', () => window.engine.load('input'));
    }

    load(processes, quantum) {
        super.load();

        const algorithms = [
            [SJF, '#sjf'],
            [PS, '#ps'],
            [RR, '#rr'],
            [SRTF, '#srtf'],
            [FCFS, '#fcfs'],
            [LJF, '#ljf'],
            [LRTF, '#lrtf']
        ];
        for (const algorithm of algorithms) {
            const copy = processes.map(p => ({ ...p }));

            let p = algorithm[0](copy, quantum),
                avgWait = p instanceof Array ? p.reduce((a, c) => a + c.wait, 0) / p.length : p.avgWait,
                avgTurn = p instanceof Array ? p.reduce((a, c) => a + c.turn, 0) / p.length : p.avgTurn;
            if (!(p instanceof Array)) p = p.processes;

            const totalBurst = p.reduce((a, c) => a + c.burst, 0);

            const elem = $(algorithm[1]).empty();
            let cumBurst = 0;
            for (const process of p) {
                const child = $(`<div>P${process.id}</div>`);
                child.css('width', (process.burst * 100 / totalBurst) + '%');
                child.attr('data-before', cumBurst);
                elem.append(child);
                cumBurst += process.burst;
            }

            $('.v-space > div:last-child').attr('data-after', totalBurst);

            // finding average
            $(`${algorithm[1]}-wait`).html(avgWait.toFixed(2));
            $(`${algorithm[1]}-turn`).html(avgTurn.toFixed(2));
        }
    }
}