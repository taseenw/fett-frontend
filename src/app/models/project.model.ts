export interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    owner: string;
    assignees: string[];
    tasks: string[];
}