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
import { useUpdatePasswordMutation } from "../feature/userApi";

const ResetPassword = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [updatePassword] = useUpdatePasswordMutation();
  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        await updatePassword({token: user.token, password: data.password, email: user.data.email}).unwrap();
        toast.success("Password updated!");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.data.message);
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
