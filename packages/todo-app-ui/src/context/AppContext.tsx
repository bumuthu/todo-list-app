import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TaskModel } from 'todo-app-common';

interface AppContextType {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    tasks: TaskModel[];
    setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
    errorOpened: boolean;
    setErrorOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [errorOpened, setErrorOpened] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ searchQuery, setSearchQuery, tasks, setTasks, errorOpened, setErrorOpened }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
