import {createContext, useContext} from 'react';

const StoreContext = createContext({});

export const useStore = () => ({
    StoreContext: useContext(StoreContext),
    StoreProvider: StoreContext.Provider
});