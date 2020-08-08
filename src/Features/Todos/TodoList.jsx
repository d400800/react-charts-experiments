import React from 'react';
import {useStore} from "./helpers/use-store";
import {TodoItem} from "./TodoItem";
import {useObserver} from "mobx-react-lite";
import {Box, Typography} from "@material-ui/core";

export const TodoList = () => {
    const todoList = useStore();

    return useObserver(() => (
        <>
            <Box my={1}>
                <Typography variant="subtitle1">Open Todos</Typography>

                {todoList.openTodos.map(todo => <TodoItem key={`${todo.data.id}-${todo.data.text}`} todo={todo}/>)}
            </Box>

            <Box mt={7}>
                <Typography variant="subtitle1">Finished Todos</Typography>

                {todoList.finishedTodos.map(todo => <TodoItem key={`${todo.data.id}-${todo.data.text}`} todo={todo}/>)}
            </Box>
        </>
    ));
};
