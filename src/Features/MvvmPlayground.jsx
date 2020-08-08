import React from 'react';

import {TodoList} from "./Todos/TodoList";
import {TodoNew} from "./Todos/TodoNew";
import {TodoList as TodoListStore} from "./Todos/stores/todo-list";
import {StoreProvider} from "./Todos/helpers/store-provider";

const todoList = new TodoListStore([
    {text: 'Implement MVVM with mobx', id: 1, isDone: false},
    {text: 'Buy milk', id: 2, isDone: false},
    {text: 'Workout', id: 3, isDone: false}
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
