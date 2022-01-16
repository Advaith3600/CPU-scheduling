// Shortest Job First
export const SJF = (processes) => {
    processes = processes.sort((a, b) => a.burst - b.burst);

    processes[0].wait = 0;
    processes[0].turn = processes[0].burst;
    for (let i = 1; i < processes.length; i++) {
        processes[i].wait = processes[i - 1].wait + processes[i - 1].burst;
        processes[i].turn = processes[i].wait + processes[i].burst;
    }

    return processes;
}