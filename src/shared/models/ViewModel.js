import ObservableModel from "./ObservableModel";

export default class ViewModel {
    constructor({modelData, uiData} = {}) {
        this.data = new ObservableModel(modelData);

        this.uiData = new ObservableModel(uiData);
    }

    updateUiData = (uiData) => {
        for (const key in uiData) {
            this.uiData[key] = uiData[key];
        }
    }

    updateData = (data) => {
        for (const key in data) {
            this.data[key] = data[key];
        }
    }

    update = (data, uiData) => {
        this.updateData(data);
        this.updateUiData(uiData)
    }
}