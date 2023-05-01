import React from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../feature/userSlice";
const Home = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    navigate('/login')
  }
  return (
    <Container fluid="md" className="my-3">
      <Row>
        <Col xs={10}>
          <h3>Home</h3>
        </Col>
        <Col>
          <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      {user && (
        <ListGroup>
          <ListGroup.Item>{user._id}</ListGroup.Item>
          <ListGroup.Item>{user.username}</ListGroup.Item>
          <ListGroup.Item>{user.email}</ListGroup.Item>
        </ListGroup>
      )}
    </Container>
  );
};

export default Home;
