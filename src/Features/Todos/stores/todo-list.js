import {action, computed, observable, decorate} from "mobx";
import TodoItem from "./todo-item";

export class TodoList {
    constructor(todos) {
        this.list = [];

        for (const todo of todos) {
            this.addTodo(todo);
        }
    }

    addTodo = (todo) => {
        this.list.push(new TodoItem(todo));
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

decorate(TodoList, {
    addTodo: action,
    removeTodo: action,
    finishedTodos: computed,
    openTodos: computed,
    list: observable.shallow,
    title: observable,
    updateTitle: action
})