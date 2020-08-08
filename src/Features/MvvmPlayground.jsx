import React from 'react';

import {TodoList} from "./Todos/TodoList";
import {TodoNew} from "./Todos/TodoNew";
import {TodoList as TodoListStore} from "./Todos/stores/todo-list";
import {StoreProvider} from "./Todos/helpers/store-provider";

const todoList = new TodoListStore([
    {
        modelData: {text: 'Implement MVVM with mobx', id: 1, isDone: false},
        uiData: {isEditing: true}
    },
    {
        modelData: {text: 'Buy milk', id: 2, isDone: false}
    },
    {
        modelData: {text: 'Workout', id: 3, isDone: false}
    }
]);

const MvvmPlayground = () => {
    return (
        <StoreProvider value={todoList}>
            <>
                <TodoNew/>

                <TodoList/>
            </>
        </StoreProvider>
    );
}

export default MvvmPlayground;
