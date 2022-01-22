// Longest Job First
import { evaluate } from "./utils.js";

export const LJF = (processes) => evaluate(evaluate(processes.sort((a, b) => b.burst - a.burst)));