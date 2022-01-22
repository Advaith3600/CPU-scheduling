export const evaluate = (processes) => {
    processes[0].wait = 0;
    processes[0].turn = processes[0].burst;
    for (let i = 1; i < processes.length; i++) {
        processes[i].wait = processes[i - 1].burst + processes[i - 1].wait;
        processes[i].turn = processes[i].burst + processes[i].wait;
    }

    return processes;
}