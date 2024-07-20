import { SimpleGrid } from "@chakra-ui/react"
import { TodoCard } from "./TodoCard"
import { useEffect } from "react"
import { TodoRestService } from "../services/todo-rest-service"
import { useAppContext } from "../context/AppContext"


export const TodoCardGrid = () => {
    const todoService = new TodoRestService();
    const context = useAppContext()

    useEffect(() => {
        todoService.getTasks().then(tasks => {
            context.setTasks(tasks)
        }).catch(err => {
            context.setErrorOpened(true)
        })
    }, [])

    return <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
        {
            context.tasks.map((task) => <TodoCard key={task.id} task={task} />)
        }
    </SimpleGrid>
}