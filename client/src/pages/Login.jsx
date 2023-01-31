import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (user) => {
    try {
      const { data } = await axios.post("/api/login", user);
      navigate("/");
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
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
                Sign In
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
