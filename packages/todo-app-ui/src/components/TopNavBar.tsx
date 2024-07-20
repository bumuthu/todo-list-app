import { Box, Button, Input, InputGroup, InputRightElement, Flex, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import { TaskFormModal } from './TaskFormModal';
import { useAppContext } from '../context/AppContext';
import { TodoRestService } from '../services/todo-rest-service';

export const TopNavBar = () => {
    const [taskModalOpened, setTaskModalOpened] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>();
    const context = useAppContext();
    const todoService = new TodoRestService();

    const onSearchClicked = () => {
        todoService.getTasks({ 'title': searchText } ).then(res => {
            context.setTasks(res)
        }).catch(() => {
            context.setErrorOpened(true)
        })
    }

    return (
        <Box boxShadow={"lg"} px="20%" py="4">
            <Flex align="center">
                <InputGroup maxW="400px" mr="4">
                    <Input placeholder="Search by title here" bg="white" onChange={(e) => setSearchText(e.target.value)} />
                    <InputRightElement width="5rem" >
                        <Button h="1.75rem" size="sm" colorScheme="green" onClick={onSearchClicked}>
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Spacer />
                <Button colorScheme="green" size={"sm"} px="10" onClick={() => setTaskModalOpened(true)}>
                    Create
                </Button>
            </Flex>
            <TaskFormModal isOpen={taskModalOpened} setOpen={(v: boolean) => setTaskModalOpened(v)}/>
        </Box>
    );
}