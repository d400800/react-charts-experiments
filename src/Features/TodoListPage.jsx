import React from 'react';

import {TodoList} from "./Todos/TodoList";
import {TodoNew} from "./Todos/TodoNew";
import TodoListStore, {useTodoListStore} from "./Todos/stores/todo-list";
import {useTestStore} from "./Todos/stores/test";

function TodoListPage() {
    const InitialTodoListStore = new TodoListStore([
        {
            modelData: {text: 'Implement MVVM with mobx', id: 1, isDone: false},
            uiData: {isEditing: false}
        },
        {
            modelData: {text: 'Buy milk', id: 2, isDone: false}
        },
        {
            modelData: {text: 'Workout', id: 3, isDone: false}
        }
    ]);

    const {StoreProvider: TodoListStoreProvider} = useTodoListStore();
    const {StoreProvider: TestStoreProvider} = useTestStore();

    return (
        <>
            <TestStoreProvider value={{test: 123}}>
                <TodoListStoreProvider value={InitialTodoListStore}>
                    <TodoNew/>

                    <TodoList/>
                </TodoListStoreProvider>
            </TestStoreProvider>
        </>
    );
}

export default TodoListPage;
