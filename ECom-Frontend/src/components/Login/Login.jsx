import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';
import { login } from "../../service/authService";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
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
      const response = await login(data);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        await loadCartData(response.data.token);
        navigate("/");
      } else {
        toast.error("Unable to login. Please try again.");
      }
    } catch (error) {
      console.log("Unable to login", error);
      toast.error("Unable to login. Please try again");
    }
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={onSubmitHandler}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name="email"
              value={data.email}
              onChange={onChangeHandler}
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
            />
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
