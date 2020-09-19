import React, {useState} from 'react';
import {onEnterPress} from "./helpers/use-enter";
import {TextField, Box, Button} from "@material-ui/core";
import {useTodoListStore} from "./stores/todo-list";
import TodoItem from "./stores/todo-item";

export const TodoNew = () => {
    const {StoreContext: todoList} = useTodoListStore();
    const [newTodo, setTodo] = useState('');

    const addTodo = () => {
        todoList.addTodo({
            modelData: {text: newTodo}
        });

        setTodo('');
    };

    return (
        <Box display="flex" alignItems="center">
            <Box mr={2}>
                <TextField variant="outlined" size="small" value={newTodo} onKeyDown={onEnterPress(addTodo)} onChange={(e) => setTodo(e.target.value)}/>
            </Box>

            <Button variant="contained" color="primary" onClick={addTodo}>Add Todo</Button>
        </Box>
    )
};
