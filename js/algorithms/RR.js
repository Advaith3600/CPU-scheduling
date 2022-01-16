// Round-robin scheduling algorithm
export const RR = (processes, quantum) => {
    let total = 0, x = processes.length;
    const burst = processes.map(p => p.burst), _processes = [];
    for (let i = 0; x !== 0;) {
        if (burst[i] <= quantum && burst[i] > 0) {
            _processes.push({ ...processes[i], burst: burst[i] });
            total += burst[i];
            burst[i] = 0;
            x--;
            processes[i].wait = total - processes[i].arrival - processes[i].burst;
            processes[i].turn = total - processes[i].arrival;
        } else if (burst[i] > 0) {
            burst[i] -= quantum;
            total += quantum;
            _processes.push({ ...processes[i], burst: quantum });
        }

        if (burst[i] !== 0) processes[i].waiting = total;

        if (i === processes.length - 1) i = 0;
        else if (processes[i + 1].arrival <= total) i++;
        else i = 0;
    }

    return {
        processes: _processes,
        avgWait: processes.reduce((a, c) => a + c.wait, 0) / processes.length,
        avgTurn: processes.reduce((a, c) => a + c.turn, 0) / processes.length
    }
}