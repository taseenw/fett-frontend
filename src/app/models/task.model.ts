export interface Task {
    
    id: number;
    parentTaskId: number;
    name: string;
    description: string;
    assignees: string[];
    status: Status;
    dueDate: string;
    priority: Priority;
    comments: string[];
    subtasks?: Task[];
    }

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
    }

export enum Status {
    Started = 'Started',
    InProgress = 'In Progress',
    QA = 'QA',
    Completed = 'Completed'
    }