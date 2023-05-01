import React, { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMatchEmailMutation, useSendMailMutation, useSendOTPQuery } from "../feature/userApi";

const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {data: otp} = useSendOTPQuery();
  const [sendMail, { isLoading }] = useSendMailMutation();
  const [matchEmail] = useMatchEmailMutation();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await matchEmail({email}).unwrap();
      if(!user) throw Error;
      const generateOTP = await otp;
      if (generateOTP.otp) {
        await sendMail({email}).unwrap();
        localStorage.setItem('user', JSON.stringify(user));
        toast.success("Sent OTP to you email. Please check your email");
        navigate("/recover");
      }
    } catch (err) {
      toast.error(err.data.message);
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
                type="email"
                placeholder="Your email"
                required={true}
              />
              <Button type="submit">{isLoading ? 'Sending': 'Send'}</Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Email;
