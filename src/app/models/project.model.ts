import { Status } from "./task.model";
import { Task } from "./task.model";

export interface Project {
    id: string;
    name: string;
    description: string;
    status: Status;
    owner: string;
    assignees: string[];
    tasks: Task[];
}