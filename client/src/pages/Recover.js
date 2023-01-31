import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Recover = () => {
  const email = JSON.parse(localStorage.getItem("email"));
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/verify-otp", { code: OTP });
      navigate("/reset");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };

  const resendOTP = async () => {
    try {
      const { data: getOTP } = await axios.get("/api/send-otp");
      if (getOTP) {
        await axios.post("/api/send-mail", {
          email,
        });
        toast.success("Sent OTP to you email. Please check your email");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card>
        <Card.Body>
          <Form className="pt-20" onSubmit={onSubmit}>
            <Stack gap={3}>
              <div className="title flex flex-col items-center">
                <h4 className="text-primary text-center">Recovery</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                  Enter OTP to recover password.
                </span>
              </div>
              <span className="text-muted">
                Enter 6 digit OTP sent to your email address.
              </span>
              <Form.Control
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                type="text"
                placeholder="OTP"
              />
              <Button type="submit">Recover</Button>
              <span className="text-center text-muted">
                Can't get OTP?
                <Button variant="link" onClick={resendOTP}>
                  Resend
                </Button>
              </span>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Recover;
