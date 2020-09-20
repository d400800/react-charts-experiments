import {action, decorate } from "mobx";
import ViewModel from "../../../shared/models/ViewModel";

export default class TodoItemVm extends ViewModel {
    static getDefaultUiData() {
        return {
            isEditing: false
        }
    }

    toggleIsEditing = () => {
        this.uiData.isEditing = !this.uiData.isEditing;
    }

    toggleIsDone = () => {
        this.data.isDone = !this.data.isDone
    }

    updateText = (text) => {
        this.data.text = text;
    }
}

decorate(TodoItemVm, {
    toggleIsDone: action,
    toggleIsEditing: action,
    updateText: action
})