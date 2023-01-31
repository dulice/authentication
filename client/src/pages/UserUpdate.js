import axios from "axios";
import React from "react";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Stack,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UserUpdate = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    },
  });
  const onSubmit = async (inputUser) => {
    try {
      const { data } = await axios.put(`/api/update/${user._id}`, inputUser, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("User updated successfully");
      navigate("/");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <Container className="my-5" fluid="md">
      <Card>
        <Card.Header as="h5" className="text-center">
          Update User Information
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
              <Row md>
                <Col>
                  <Form.Control
                    {...register("firstName")}
                    placeholder="First Name"
                  />
                </Col>
                <Col>
                  <Form.Control
                    {...register("lastName")}
                    placeholder="Last Name"
                  />
                </Col>
              </Row>
              <Form.Control {...register("username")} placeholder="Username" />
              <Form.Control {...register("email")} placeholder="Email" />
              <Form.Control {...register("password")} placeholder="Password" />
              <Form.Control
                {...register("phoneNumber")}
                placeholder="Phone number"
              />
              <Button type="submit">Update</Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserUpdate;
