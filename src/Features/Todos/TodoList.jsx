import React from 'react';
import {TodoItem} from "./TodoItem";
import {useObserver} from "mobx-react-lite";
import {Box, Typography} from "@material-ui/core";
import {useTestStore} from "./stores/test";
import {useTodoListStore} from "./stores/todo-list";

export const TodoList = () => {
    const {StoreContext: todoList} = useTodoListStore();
    const {StoreContext: test} = useTestStore();

    return useObserver(() => (
        <>
            <Box>{JSON.stringify(test)}</Box>

            <Box my={1}>
                <Typography variant="h5" gutterBottom>Open Todos</Typography>

                {todoList.openTodos.map(todo => <TodoItem key={`${todo.data.id}-${todo.data.text}`} todo={todo}/>)}
            </Box>

            <Box mt={7}>
                <Typography variant="h5">Finished Todos</Typography>

                {todoList.finishedTodos.map(todo => <TodoItem key={`${todo.data.id}-${todo.data.text}`} todo={todo}/>)}
            </Box>

            <Box>
                <Typography variant="h5">Selected Todo</Typography>

                {todoList.selectedTodo &&
                    <TodoItem todo={todoList.selectedTodo}/>
                }
            </Box>
        </>
    ));
};
