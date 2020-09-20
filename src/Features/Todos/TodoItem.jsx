import React from 'react';
import {Button, Box, Typography, Checkbox, IconButton, TextField} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AdjustIcon from '@material-ui/icons/Adjust';
import EditIcon from '@material-ui/icons/Edit';
import {useObserver} from "mobx-react-lite";
import {useTodoListStore} from './stores/todo-list';
import ViewModel from "../../shared/models/ViewModel";
import useViewModel from "../../shared/hooks/use-view-model";

export const TodoItem = ({todo}) => {
    const {StoreContext: todoList} = useTodoListStore();

    return (
        useObserver(() => (
            <>
                {
                    todo.uiData.isEditing
                        ?
                        <Box display="flex" alignItems="center">
                            <Box mr={2}>
                                <TodoText onSave={todo.update}
                                          todoText={todo.data.text}/>
                            </Box>
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

                            <IconButton onClick={() => todo.updateUiData({isEditing: true})}>
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

function TodoText({todoText, onSave}) {
    const todoTextVm = useViewModel(new ViewModel({
        data: {text: todoText}
    }));

    return (
        useObserver(() => (
            <>
                <TextField value={todoTextVm.data.text} variant="outlined" size="small"
                           onChange={e => todoTextVm.updateData({text: e.target.value})}
                />

                <Button variant="contained" color="primary"
                        onClick={() => onSave({text: todoTextVm.data.text}, {isEditing: false})}
                >
                    save
                </Button>
            </>
        ))
    );
}