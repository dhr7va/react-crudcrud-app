import { createContext, useReducer } from "react";

const ItemContext = createContext();

const itemReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, action.payload];
        case "UPDATE_ITEM":
            return state.map(item =>
                item.id === action.payload.id ? action.payload : item
            );
        case "DELETE_ITEM":
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};

export const ItemProvider = ({ children }) => {
    const [items, dispatch] = useReducer(itemReducer, []);

    return (
        <ItemContext.Provider value={{ items, dispatch }}>
            {children}
        </ItemContext.Provider>
    );
};

export default ItemContext;
