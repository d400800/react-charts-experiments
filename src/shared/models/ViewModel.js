import ObservableModel from "./ObservableModel";

export default class ViewModel {
    constructor({data, uiData} = {}) {
        this.data = new ObservableModel(data);

        this.uiData = new ObservableModel({
            ...this.constructor.getDefaultUiData(),
            ...uiData
        });
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

    static getDefaultUiData() {
        return {};
    }
}