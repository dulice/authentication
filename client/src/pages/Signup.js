import { Container, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../feature/userApi";
import { login } from "../feature/userSlice";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRegister, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data) => {
    try {
      const user = await userRegister(data).unwrap();
      dispatch(login(user));
      navigate("/login");
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  return (
    <Container>
      <Card className="m-5">
        <Card.Header>
          <h5 className="text-primary text-center">Signup</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Username: </Form.Label>
            <Form.Control {...register("username")} name="username" />

            <Form.Label>Email: </Form.Label>
            <Form.Control {...register("email")} name="email" type="email" />

            <Form.Label>Password: </Form.Label>
            <Form.Control
              {...register("password")}
              name="password"
              type="password"
            />
            <div className="d-flex flex-column justify-content-center">
              <Button className="my-3 float-right" type="submit">
                {isLoading ? 'Signing In': 'SignIn'}
              </Button>
              <p className="m-auto">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
