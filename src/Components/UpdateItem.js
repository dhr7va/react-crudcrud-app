import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ItemContext from "../Context/ItemContext";

const UpdateItem = ({ item, show, handleClose }) => {
    const { dispatch } = useContext(ItemContext);
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [imageUrl, setImageUrl] = useState(item.imageUrl);

    const handleUpdate = () => {
        const updatedItem = {
            ...item,
            title,
            description,
            imageUrl,
        };
        dispatch({ type: "UPDATE_ITEM", payload: updatedItem });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update Item
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateItem;
