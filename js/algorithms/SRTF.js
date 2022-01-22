// Shortest Remaining Time First
export const SRTF = (processes) => {
    processes = processes.map(p => ({ ...p, remaining: p.burst }));

    const _processes = [];
    let remain = 0;
    for (let time = 0; remain !== processes.length; time++) {
        let smallest = processes.reduce((a, c, i) => (c.remaining > 0 && a[0] > c.remaining ? [c.remaining, i] : a), [Infinity, -1])[1];

        for (let i = 0; i < processes.length; i++) {
            if (
                processes[i].arrival <= time &&
                processes[i].remaining < processes[smallest].remaining &&
                processes[i].remaining > 0
            ) smallest = i;
        }

        processes[smallest].remaining--;
        if (processes[smallest].remaining === 0) {
            remain++;
            _processes.push({
                ...processes[smallest],
                turn: time + 1 - processes[smallest].arrival,
                wait: time + 1 - processes[smallest].arrival - processes[smallest].burst,
            });
        }
    }

    return _processes;
}