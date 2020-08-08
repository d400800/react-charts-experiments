import ObservableModel from "./ObservableModel";

export default class ViewModel {
    constructor({modelData, uiData} = {}) {
        this.data = new ObservableModel(modelData);

        this.uiData = new ObservableModel(uiData);
    }
}