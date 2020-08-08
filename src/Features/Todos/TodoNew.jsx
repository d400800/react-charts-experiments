import React, {useState} from 'react';
import {useStore} from "./helpers/use-store";
import {onEnterPress} from "./helpers/use-enter";
import {TextField, Box, Button} from "@material-ui/core";

export const TodoNew = () => {
    const [newTodo, setTodo] = useState('');
    const todoList = useStore();

    const addTodo = () => {
        todoList.addTodo(newTodo);

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
