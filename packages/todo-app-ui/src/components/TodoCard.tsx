import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Heading, Text } from "@chakra-ui/react"
import { TaskModel, TaskStatus } from "todo-app-common"
import { TodoRestService } from "../services/todo-rest-service"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { DeleteIcon } from "@chakra-ui/icons"

interface ITodoCardProps {
  task: TaskModel,
}

export const TodoCard = (props: ITodoCardProps) => {
  const todoService = new TodoRestService();
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const context = useAppContext()

  const onClickStatusChange = (status: TaskStatus) => {
    setUpdateLoading(true)
    todoService.updateTask({ status, id: props.task.id } as TaskModel)
      .then((res) => {
        updateTask(res)
        setUpdateLoading(false)
      })
      .catch(() => {
        context.setErrorOpened(true)
        setUpdateLoading(false)
      })
  }

  const updateTask = (task: TaskModel) => {
    const record = context.tasks.find(r => r.id == task.id)
    if (!record) {
      throw new Error("Record not found");
    }
    const index = context.tasks.indexOf(record);
    context.tasks[index].status = task.status;
  }

  const onDelete = () => {
    todoService.deleteTask(props.task.id)
      .then(() => {
        context.setTasks(tasks => tasks.filter(task => task.id != props.task.id))
      })
      .catch(() => {
        context.setErrorOpened(true)
      })
  }

  return <Card>
    <Box
      height="5px"
      backgroundColor={props.task.status == TaskStatus.DONE ? "green.500" : "purple.500"}
      roundedTop={"md"}
    />
    <CardHeader>
      <Heading size='xs'> #{props.task.id}</Heading>
      <Heading size='md'> {props.task.title}</Heading>
      <Checkbox size='md' colorScheme='green' disabled={true} isChecked={(props.task.status == TaskStatus.DONE)}>
        {props.task.status == TaskStatus.TODO ? "Todo" : "Done"}
      </Checkbox>
    </CardHeader>
    <CardBody>
      <Text>{props.task.description}</Text>
    </CardBody>
    <CardFooter>
      <Flex justifyContent="space-between" width="100%">
        <Button size="sm" onClick={onDelete}>
          <DeleteIcon />
        </Button>
        {
          props.task.status == TaskStatus.TODO ?
            <Button size={"sm"} colorScheme='purple' onClick={() => onClickStatusChange(TaskStatus.DONE)} isLoading={updateLoading}>Mark as Done</Button> :
            <Button size={"sm"} colorScheme='green' variant='outline' onClick={() => onClickStatusChange(TaskStatus.TODO)} isLoading={updateLoading}>Mark as Todo</Button>
        }
      </Flex>

    </CardFooter>
  </Card>
}