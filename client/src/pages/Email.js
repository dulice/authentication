import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: OTP } = await axios.get("/api/send-otp");
      if (OTP) {
        await axios.post("/api/send-mail", {
          email,
        });
        toast.success("Sent OTP to you email. Please check your email");
        localStorage.setItem("email", JSON.stringify(email));
        navigate("/recover");
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data);
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
                  Enter email to send an OTP recovery.
                </span>
              </div>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Your email"
              />
              <Button type="submit">Send</Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Email;
