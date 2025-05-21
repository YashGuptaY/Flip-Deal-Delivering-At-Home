import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Header, Message, Modal, Icon, TransitionablePortal } from 'semantic-ui-react';
import { login } from "../../service/authService";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import "./Login.css";

const Login = ({ open, onClose, switchToRegister }) => {
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
        onClose();
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
    <TransitionablePortal
      open={open}
      transition={{ animation: 'scale', duration: 300 }}
    >
      <Modal 
        open={true} 
        onClose={onClose} 
        size="tiny"
        className="login-modal"
      >
        <Modal.Header className="modal-header">
          <Header as='h2' color='teal' textAlign='center'>
            <Header.Content>
              Welcome Back!
              <Header.Subheader>
                Log in to your account to continue
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Modal.Header>
        <Modal.Content>
          <Form size='large' onSubmit={onSubmitHandler} className="login-form">
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              className="form-input"
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
              className="form-input"
            />
            <Button 
              color='teal' 
              fluid 
              size='large'
              className="submit-button"
              animated
            >
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name='sign-in' />
              </Button.Content>
            </Button>
          </Form>
          <Message warning>
            <Icon name='help' />
            <span>New to us? </span>
            <a 
              href="#" 
              onClick={switchToRegister}
              className="switch-auth-mode"
            >
              Sign Up Now
            </a>
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' onClick={onClose}>
            <Icon name='close' /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    </TransitionablePortal>
  );
};

export default Login;
