import React, { useContext } from 'react';
import { TodoCardGrid } from './TodoCardGrid';
import { Box } from '@chakra-ui/react';
import { TopNavBar } from './TopNavBar';
import ErrorAlert from './ErrorAlert';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const context = useAppContext();

  return (
    <>
      <ErrorAlert isOpen={context.errorOpened} setIsOpen={(v: boolean) => context.setErrorOpened(v)}/>
      <TopNavBar />
      <Box mx="20%" my="100px">
        <TodoCardGrid />
      </Box>

    </>
  );
}

export default Home;
