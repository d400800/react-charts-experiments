import {extendObservable} from "mobx";


export default class ObservableModel {
    constructor(data) {
        extendObservable(
            this,{...data}
        )
    }
}