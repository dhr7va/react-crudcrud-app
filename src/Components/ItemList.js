import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ItemContext from "../Context/ItemContext";
import axios from "axios";

const API_URL = "https://crudcrud.com/api/c97ad2ea6ea5493591a25bfadf7ca1ad/items";

const fetchItems = async (dispatch) => {
    try {
        const response = await axios.get(API_URL);
        dispatch({ type: "SET_ITEMS", payload: response.data });
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};

const addItem = async (item, dispatch) => {
    try {
        const response = await axios.post(API_URL, item);
        dispatch({ type: "ADD_ITEM", payload: response.data });
    } catch (error) {
        console.error("Error adding item:", error);
    }
};

const updateItem = async (item, dispatch) => {
    try {
        await axios.put(`${API_URL}/${item._id}`, item);
        dispatch({ type: "UPDATE_ITEM", payload: item });
    } catch (error) {
        console.error("Error updating item:", error);
    }
};

const deleteItem = async (id, dispatch) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        dispatch({ type: "DELETE_ITEM", payload: id });
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};

export { fetchItems, addItem, updateItem, deleteItem };

const ItemList = () => {
    const { items, dispatch } = useContext(ItemContext);

    const handleDelete = (id) => {
        dispatch({ type: "DELETE_ITEM", payload: id });
    };

    return (
        <Container className="my-4">
            <Row>
                {items.map((item) => (
                    <Col md={4} key={item.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={item.imageUrl} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ItemList;
