export interface List {
    id: string,
    name: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
}

export interface Task {
    id: string,
    name: string;
    done?: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}