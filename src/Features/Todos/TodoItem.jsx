import React, {useState} from 'react';
import {onEnterPress} from "./helpers/use-enter";
import {Button, Box, Typography, Checkbox, IconButton, TextField} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AdjustIcon from '@material-ui/icons/Adjust';
import EditIcon from '@material-ui/icons/Edit';
import {useObserver} from "mobx-react-lite";
import {useTodoListStore} from './stores/todo-list';

export const TodoItem = ({todo}) => {
    const {StoreContext: todoList} = useTodoListStore();

    const [newText, setText] = useState(todo.data.text);

    const saveText = () => {
        todo.updateText(newText);

        todo.toggleIsEditing();
    };

    return (
        useObserver(() => (
            <>
                {
                    todo.uiData.isEditing
                        ?
                        <Box display="flex" alignItems="center">
                            <Box mr={2}>
                                <TextField value={newText} variant="outlined" size="small" onKeyDown={onEnterPress(saveText)}
                                           onChange={e => setText(e.target.value)}/>
                            </Box>

                            <Button variant="contained" color="primary" onClick={saveText}>save</Button>
                        </Box>
                        :
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                color="primary"
                                defaultChecked={todo.data.isDone}
                                onChange={todo.toggleIsDone}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />

                            <Typography variant="body1">{todo.data.text}</Typography>

                            <IconButton onClick={() => todo.toggleIsEditing()}>
                                <EditIcon/>
                            </IconButton>

                            <IconButton onClick={() => todoList.removeTodo(todo)}>
                                <HighlightOffIcon/>
                            </IconButton>

                            <IconButton onClick={() => todoList.selectedTodo = todo}>
                                <AdjustIcon/>
                            </IconButton>
                        </Box>
                }
                <Typography variant={"caption"}>{JSON.stringify(todo)}</Typography>
            </>
        ))
    )
};
