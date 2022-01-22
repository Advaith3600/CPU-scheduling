// Priority Scheduling
import { evaluate } from "./utils.js";

export const PS = (processes) => evaluate(processes.sort((a, b) => a.priority - b.priority));