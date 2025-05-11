import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { toast } from "react-toastify";
import { registerUser } from "../../service/authService";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success("Registration completed. Please login.");
        navigate("/login");
      } else {
        toast.error("Unable to register. Please try again");
      }
    } catch (error) {
      toast.error("Unable to register. Please try again");
    }
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Create new account
        </Header>
        <Form size='large' onSubmit={onSubmitHandler}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Full Name'
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
            <Form.Input
              fluid
              icon='mail'
              iconPosition='left'
              placeholder='E-mail address'
              type='email'
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
            <Button color='teal' fluid size='large' type='submit'>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
