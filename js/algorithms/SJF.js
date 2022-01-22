// Shortest Job First
import { evaluate } from "./utils.js";

export const SJF = (processes) => evaluate(processes.sort((a, b) => a.burst - b.burst));