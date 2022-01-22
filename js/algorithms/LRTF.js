// Longest Remaining Time First
export const LRTF = (processes) => {
    processes = processes.map(p => ({ ...p, remaining: p.burst }));

    const _processes = [];
    let remain = 0;
    for (let time = 0; remain !== processes.length; time++) {
        let largest = processes.reduce((a, c, i) => (c.remaining > 0 && a[0] < c.remaining ? [c.remaining, i] : a), [0, -1])[1];

        for (let i = 0; i < processes.length; i++) {
            if (
                processes[i].arrival <= time &&
                processes[i].remaining > processes[largest].remaining &&
                processes[i].remaining > 0
            ) largest = i;
        }

        processes[largest].remaining--;
        if (processes[largest].remaining === 0) {
            remain++;
            _processes.push({
                ...processes[largest],
                turn: time + 1 - processes[largest].arrival,
                wait: time + 1 - processes[largest].arrival - processes[largest].burst,
            });
        }
    }

    return _processes;
}