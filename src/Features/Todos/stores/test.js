import {createContext, useContext} from 'react';

import {observable, decorate} from "mobx";

export default class TestStore {
    constructor() {
        this.list = [];
    }
}

decorate(TestStore, {
    list: observable.shallow
})

const TestStoreContext = createContext({});

export const useTestStore = () => ({
    StoreContext: useContext(TestStoreContext),
    StoreProvider: TestStoreContext.Provider
});