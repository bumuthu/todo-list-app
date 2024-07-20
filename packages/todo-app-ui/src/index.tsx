import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/chakra-theme';
import Home from './components/Home';
import { AppProvider } from './context/AppContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </AppProvider>
  </React.StrictMode>
);
