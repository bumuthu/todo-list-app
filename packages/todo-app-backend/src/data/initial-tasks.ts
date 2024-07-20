import { TaskModel, TaskStatus } from "todo-app-common";

export const initialTasks: TaskModel[] = [
    {
        id: 1,
        title: "Complete Assignment",
        description: "Complete the React/Node/Express assignment. The assignment involves implementing a todo list application.",
        createdAt: "1721333421252",
        status: TaskStatus.TODO
    }
]