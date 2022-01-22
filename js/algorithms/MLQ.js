// MultiLevel Queue
export const MLQ = (processes) => {
    for (let i = 0; i < processes.length; i++)
        for (let k = i + 1; k < processes.length; k++)
            if(processes[i].system > processes[k].system) {
                const temp = processes[i];
                processes[i] = processes[k];
                processes[k] = temp;
            }

    processes[0].wait = processes[0].turn = 0;
    for (let i = 1; i < processes.length; i++) {
        processes[i].wait = processes[i - 1].wait + processes[i - 1].burst;
        processes[i].turn = processes[i - 1].turn + processes[i].burst;
    }

    return processes;
}