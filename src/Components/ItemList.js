import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import ItemContext from "../Context/ItemContext";

const ItemList = () => {
    const { items, deleteItem, updateItem } = useContext(ItemContext);
    const [show, setShow] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [updatedImageUrl, setUpdatedImageUrl] = useState("");

    const handleClose = () => setShow(false);

    const handleShow = (item) => {
        setCurrentItem(item);
        setUpdatedTitle(item.title);
        setUpdatedDescription(item.description);
        setUpdatedImageUrl(item.imageUrl);
        setShow(true);
    };

    const handleUpdate = () => {
        if (currentItem) {
            const updatedItem = {
                ...currentItem,
                title: updatedTitle,
                description: updatedDescription,
                imageUrl: updatedImageUrl,
            };
            updateItem(updatedItem);
        }
        handleClose();
    };

    return (
        <Container className="my-4">
            <Row>
                {items.map((item) => (
                    <Col md={4} key={item._id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={item.imageUrl} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Button variant="danger" onClick={() => deleteItem(item._id)}>
                                    Delete
                                </Button>{" "}
                                <Button variant="primary" onClick={() => handleShow(item)}>
                                    Edit
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {currentItem && (
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
                                    value={updatedImageUrl}
                                    onChange={(e) => setUpdatedImageUrl(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={updatedDescription}
                                    onChange={(e) => setUpdatedDescription(e.target.value)}
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
            )}
        </Container>
    );
};

export default ItemList;
