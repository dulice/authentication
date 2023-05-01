import { Container, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../feature/userApi";
import { login } from "../feature/userSlice";
import Cookies from "js-cookie";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLogin, { isLoading }] = useLoginMutation();
  const onSubmit = async (user) => {
    try {
      const {data, token} = await userLogin(user).unwrap();
      Cookies.set('token', token, {expires: Date.now() + (1000 * 60 * 60 * 24)})
      dispatch(login(data));
      navigate("/");
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  return (
    <Container>
      <Card className="m-5">
        <Card.Header>
          <h5 className="text-primary text-center">Login</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Email: </Form.Label>
            <Form.Control {...register("email")} name="email" type="email" />

            <Form.Label>Password: </Form.Label>
            <Form.Control
              {...register("password")}
              name="password"
              type="password"
            />
            <p className="m-2 text-center">
              Forget Password? <Link to="/email">Reset Password</Link>
            </p>
            <div className="d-flex flex-column justify-content-center">
              <Button className="my-3 float-right" type="submit">
                {isLoading ? 'Logging In': 'Login'}
              </Button>
              <p className="m-auto">
                Don't have an account? <Link to="/signup">Register</Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
