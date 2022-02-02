// Shortest Remaining Time First
const findWaitingTime = (proc, n) => {
    let complete = 0, t = 0, minm = Infinity;
    let shortest = 0, finish_time;
    let check = false;

    while (complete !== n) {
        for (let j = 0; j < n; j++) {
            if ((proc[j].arrival <= t) &&
                (proc[j].remaining < minm) && proc[j].remaining > 0) {
                minm = proc[j].remaining;
                shortest = j;
                check = true;
            }
        }

        if (check === false) {
            t++;
            continue;
        }

        proc[shortest].remaining--;
        minm = proc[shortest].remaining;
        if (minm === 0) minm = Infinity;

        if (proc[shortest].remaining === 0) {
            complete++;
            check = false;
            finish_time = t + 1;
            proc[shortest].wait = finish_time - proc[shortest].burst - proc[shortest].arrival;
            if (proc[shortest].wait < 0) proc[shortest].wait = 0;
        }
        t++;
    }
}

export const SRTF = (processes) => {
    processes = processes.map(p => ({ ...p, remaining: p.burst }));
    findWaitingTime(processes, processes.length);
    for (let i = 0; i < processes.length; i++) processes[i].turn = processes[i].burst + processes[i].wait;

    return {
        processes,
        avgWait: processes.reduce((a, c) => a + c.wait, 0) / processes.length,
        avgTurn: processes.reduce((a, c) => a + c.turn, 0) / processes.length
    };
}