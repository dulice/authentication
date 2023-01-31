import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Container fluid="md" className="my-3">
      <h3>Home</h3>
      {user && (
        <ListGroup>
          <ListGroup.Item>{user._id}</ListGroup.Item>
          <ListGroup.Item>{user.firstName}</ListGroup.Item>
          <ListGroup.Item>{user.lastName}</ListGroup.Item>
          <ListGroup.Item>{user.username}</ListGroup.Item>
          <ListGroup.Item>{user.email}</ListGroup.Item>
          <ListGroup.Item>{user.phoneNumber}</ListGroup.Item>
        </ListGroup>
      )}
    </Container>
  );
};

export default Home;
