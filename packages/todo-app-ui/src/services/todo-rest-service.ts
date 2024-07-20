import { TaskModel } from "todo-app-common";
import { RestClient } from "./rest-client";

export class TodoRestService {
    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient();
    }

    async getTasks(params?: Record<string, any>): Promise<TaskModel[]> {
        return this.restClient.get<TaskModel[]>("tasks", params);
    }

    async createTask(data: TaskModel): Promise<TaskModel> {
        return this.restClient.post<TaskModel>("tasks", data);
    }

    async updateTask(data: TaskModel): Promise<TaskModel> {
        return this.restClient.put<TaskModel>(`tasks/${data.id}`, data);
    }

    async deleteTask(taskId: number): Promise<TaskModel> {
        return this.restClient.delete<TaskModel>(`tasks/${taskId}`);
    }
}