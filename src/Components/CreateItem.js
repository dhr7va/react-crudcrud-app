import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import ItemContext from "../Context/ItemContext";

const CreateItem = () => {
    const { dispatch } = useContext(ItemContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !imageUrl) {
            alert("Title and Image URL are required");
            return;
        }

        const newItem = {
            id: Date.now(),
            title,
            description,
            imageUrl,
        };

        dispatch({ type: "ADD_ITEM", payload: newItem });

        setTitle("");
        setDescription("");
        setImageUrl("");
    };

    return (
        <Container className="my-4">
            <h3>Add a New Item</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Item
                </Button>
            </Form>
        </Container>
    );
};

export default CreateItem;
