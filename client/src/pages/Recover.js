import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSendMailMutation, useVerifyOTPMutation } from "../feature/userApi";

const Recover = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [verifyOTP, {isLoading}] = useVerifyOTPMutation();
  const [sendMail] = useSendMailMutation();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOTP({otp: OTP}).unwrap();
      navigate("/reset");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  const resendOTP = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/sendOTP`);
      if (data.otp) {
        await sendMail({email: user.data.email}).unwrap();
        toast.success("Sent OTP to you email. Please check your email");
      }
    } catch (err) {
      toast.error(err);
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
              <Button type="submit">{isLoading ? 'Recovering' : 'Recover'}</Button>
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
