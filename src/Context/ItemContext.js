import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const ItemContext = createContext();

const API_URL = "https://crudcrud.com/api/c97ad2ea6ea5493591a25bfadf7ca1ad/items";

const itemReducer = (state, action) => {
    switch (action.type) {
        case "SET_ITEMS":
            return action.payload;
        case "ADD_ITEM":
            return [...state, action.payload];
        case "UPDATE_ITEM":
            return state.map((item) => (item._id === action.payload._id ? action.payload : item));
        case "DELETE_ITEM":
            return state.filter((item) => item._id !== action.payload);
        default:
            return state;
    }
};

export const ItemProvider = ({ children }) => {
    const [items, dispatch] = useReducer(itemReducer, []);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(API_URL);
                dispatch({ type: "SET_ITEMS", payload: response.data });
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const addItem = async (item) => {
        try {
            const response = await axios.post(API_URL, item);
            dispatch({ type: "ADD_ITEM", payload: response.data });
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const updateItem = async (updatedItem) => {
        try {
            await axios.put(`${API_URL}/${updatedItem._id}`, updatedItem);
            dispatch({ type: "UPDATE_ITEM", payload: updatedItem });
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            dispatch({ type: "DELETE_ITEM", payload: id });
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <ItemContext.Provider value={{ items, dispatch, addItem, updateItem, deleteItem }}>
            {children}
        </ItemContext.Provider>
    );
};

export default ItemContext;