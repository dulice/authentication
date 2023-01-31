import axios from "axios";
import React from "react";
import {
  Card,
  Container,
  Form,
  FormGroup,
  Stack,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const email = "test@gmail.com";
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        const { data: updatePassword } = await axios.put("/api/reset", {
          password: data.password,
          email,
        });
        toast.success("Password updated!");
        navigate("/login");
        localStorage.removeItem("email");
        console.log(updatePassword);
      }
    } catch (err) {
      if (err.response.data) {
        console.log(err.response.data.message);
      }
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
              <h4 className="text-center text-primary">Reset Password</h4>
              <FormGroup>
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  {...register("password")}
                  type="password"
                  placeholder="Enter new password"
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Re-enter Password:</Form.Label>
                <Form.Control
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Repeat password"
                />
              </FormGroup>
              <Button type="submit">Reset</Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResetPassword;
