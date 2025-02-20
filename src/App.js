import React from "react";
import CreateItem from "./Components/CreateItem";
import ItemList from "./Components/ItemList";
import { Container, Navbar } from "react-bootstrap";

const App = () => {
  return (

    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>React CRUD Application</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <CreateItem />
        <ItemList />
      </Container>

    </>
  );
};

export default App;
