import {action, observable, extendObservable, decorate } from "mobx";
import ObservableModel from "../../../shared/models/ViewModel";

export default class TodoItem {
    constructor(data = {}) {
        this.data = new ObservableModel(data);

        this.viewData =  new ObservableModel({isEditing: false});
    }

    toggleIsEditing = () => {
        console.log(this);
        this.viewData.isEditing = !this.viewData.isEditing;
    }

    toggleIsDone = () => {
        this.data.isDone = !this.data.isDone
    }

    updateText = (text) => {
        this.data.text = text;
    }
}

decorate(TodoItem, {
    toggleIsDone: action,
    toggleIsEditing: action,
    updateText: action,
    //data: observable,
    //viewData: observable
})