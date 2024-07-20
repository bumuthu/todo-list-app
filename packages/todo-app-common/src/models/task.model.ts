import { TaskStatus } from "../enums";
import { EntityModel } from "./entity.model";

export interface TaskModel extends EntityModel{
    title: string;
    description: string;
    createdAt: string;
    status: TaskStatus
}