import React, {useState} from 'react';
import {onEnterPress} from "./helpers/use-enter";
import {TextField, Box, Button} from "@material-ui/core";
import {useTodoListStore} from "./stores/todo-list";
import {useObserver} from "mobx-react-lite";
import ViewModel from "../../shared/models/ViewModel";
import useViewModel from "../../shared/hooks/use-view-model";

class TodoNewVm extends ViewModel {
    static getDefaultUiData() {
        return {
            name: 'test'
        }
    }
}

export const TodoNew = () => {
    const {StoreContext: todoList} = useTodoListStore();
    const todoNewVm = useViewModel(new TodoNewVm());

    const addTodo = () => {
        todoList.addTodo({
            data: {text: todoNewVm.uiData.name}
        });

        todoNewVm.updateUiData({
            name: ''
        })
    };

    return (
        useObserver(() =>
            <Box display="flex" alignItems="center">
                <Box mr={2}>
                    <TextField variant="outlined" size="small"
                               value={todoNewVm.uiData.name}
                               onKeyDown={onEnterPress(addTodo)}
                               onChange={e => todoNewVm.updateUiData({
                                   name: e.target.value
                               })}
                    />
                </Box>

                <Button variant="contained" color="primary" onClick={addTodo}>Add Todo</Button>
            </Box>
        )
    )
};
