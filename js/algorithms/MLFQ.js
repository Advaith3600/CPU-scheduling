// Multi Level Feedback Queue
export const MLFQ = (processes) => {
    const tq1 = 5, tq2 = 8;

    const Q1 = processes.sort((a, b) => a.arrival - b.arrival).map(p => ({ ...p, remaining: p.burst }));
    const Q2 = [], Q3 = [], _processes = [];

    let time = Q1[0].arrival, k = 0, flag = 0, r = 0;
    for (let i = 0; i < processes.length; i++) {
        if (Q1[i].remaining <= tq1) {
            time += Q1[i].remaining; /*from arrival time of first process to completion of this process*/
            Q1[i].remaining = 0;
            Q1[i].wait = time - Q1[i].arrival - Q1[i].burst; /*amount of time process has been waiting in the first queue*/
            Q1[i].turn = time - Q1[i].arrival; /*amount of time to execute the process*/
            _processes.push(Q1[i]);
        } else { /*process moves to queue 2 with qt=8*/
            Q2[k] = { id: Q1[i].id, wait: time };
            time += tq1;
            Q1[i].remaining -= tq1;
            Q2[k].burst = Q1[i].remaining;
            Q2[k].remaining = Q2[k].burst;
            k++;
            flag = 1;
        }
    }

    for (let i = 0; i < k; i++) {
        if (Q2[i].remaining <= tq2) {
            time += Q2[i].remaining; /*from arrival time of first process +burst of this process*/
            Q2[i].remaining = 0;
            Q2[i].wait = time - tq1 - Q2[i].burst; /*amount of time process has been waiting in the ready queue*/
            Q2[i].turn = time - Q2[i].arrival; /*amount of time to execute the process*/
            _processes.push(Q2[i]);
        } else { /*process moves to queue 3 with FCFS*/
            Q3[r] = { id: Q2[i].id, arrival: time };
            time += tq2;
            Q2[i].remaining -= tq2;
            Q3[r].burst = Q2[i].remaining;
            Q3[r].remaining = Q3[r].burst;
            r++;
            flag = 2;
        }
    }

    for (let i = 0; i < r; i++) {
        if (i === 0) Q3[i].CT = Q3[i].burst + time - tq1 - tq2;
        else Q3[i].CT = Q3[i - 1].CT + Q3[i].burst;
    }

    for (let i = 0; i < r; i++) {
        Q3[i].turn = Q3[i].CT;
        Q3[i].wait = Q3[i].turn - Q3[i].burst;
        _processes.push(Q3[i]);
    }

    return _processes;
}