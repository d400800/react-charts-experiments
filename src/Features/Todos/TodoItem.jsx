import React, {useState} from 'react';
import {useStore} from "./helpers/use-store";
import {onEnterPress} from "./helpers/use-enter";
import {Button, Box, Typography, Checkbox, IconButton, TextField} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import {useObserver} from "mobx-react-lite";

export const TodoItem = ({todo}) => {
    const todoList = useStore();
    const [newText, setText] = useState(todo.data.text);

    const saveText = () => {
        todo.updateText(newText);

        todo.toggleIsEditing();
    };

    return (
        useObserver(() => (
            <>
                {
                    todo.viewData.isEditing ?
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
                        </Box>
                }
            </>
        ))
    )
};
