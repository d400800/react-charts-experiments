import {createContext, useContext} from 'react';

import {action, computed, observable, decorate} from "mobx";
import TodoItemVm from "./todo-item";

export default class TodoListStore {
    constructor(todos) {
        this.list = [];
        this.selectedTodo = null;

        for (const todo of todos) {
            this.addTodo(todo);
        }
    }

    addTodo = (todo) => {
        this.list.push(new TodoItemVm(todo));
    }

    removeTodo = (todo) => {
        this.list.splice(this.list.indexOf(todo), 1);
    };

    get finishedTodos() {
        return this.list.filter(todo => todo.data.isDone);
    }

    get openTodos() {
        return this.list.filter(todo => !todo.data.isDone);
    }
}

decorate(TodoListStore, {
    addTodo: action,
    removeTodo: action,
    finishedTodos: computed,
    openTodos: computed,
    list: observable.shallow,
    title: observable,
    updateTitle: action,
    selectedTodo: observable
})

const TodoListStoreContext = createContext({});

export const useTodoListStore = () => ({
    StoreContext: useContext(TodoListStoreContext),
    StoreProvider: TodoListStoreContext.Provider
});