// Shortest Job First
import { evaluate } from "./utils.js";

const arrangeArrival = (num, mat) => {
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num - i - 1; j++) {
            if (mat[j].arrival > mat[j + 1].arrival) {
                const temp = mat[j];
                mat[j] = mat[j + 1];
                mat[j + 1] = temp;
            }
        }
    }
}

const completionTime = (num, mat) => {
    let val;
    mat[0].temp = mat[0].arrival + mat[0].burst;
    mat[0].turn = mat[0].temp - mat[0].arrival;
    mat[0].wait = mat[0].turn - mat[0].burst;

    for (let i = 1; i < num; i++) {
        let temp = mat[i - 1].temp;
        let low = mat[i].burst;
        for (let j = i; j < num; j++) {
            if (temp >= mat[j].arrival && low >= mat[j].burst) {
                low = mat[j].burst;
                val = j;
            }
        }
        mat[val].temp = temp + mat[val].burst;
        mat[val].turn = mat[val].temp - mat[val].arrival;
        mat[val].wait = mat[val][5] - mat[val].burst;

        temp = mat[i];
        mat[i] = mat[val];
        mat[val] = temp;
    }
}

export const SJF = (processes) => {
    arrangeArrival(processes.length, processes);
    completionTime(processes.length, processes);
    return evaluate(processes);
}