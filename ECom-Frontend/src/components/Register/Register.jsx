import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Header, Message, Modal, TransitionablePortal, Icon } from 'semantic-ui-react';
import { toast } from "react-toastify";
import { registerUser } from "../../service/authService";
import "./Register.css";

const Register = ({ open, onClose, switchToLogin }) => {
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
        switchToLogin();
      } else {
        toast.error("Unable to register. Please try again");
      }
    } catch (error) {
      toast.error("Unable to register. Please try again");
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
        className="register-modal"
      >
        <Modal.Header className="modal-header">
          <Header as='h2' color='teal' textAlign='center'>
            <Header.Content>
              Create Account
              <Header.Subheader>
                Join our community today
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Modal.Header>
        <Modal.Content>
          <Form size='large' onSubmit={onSubmitHandler} className="register-form">
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Full Name'
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              className="form-input"
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
              className="form-input"
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
              className="form-input"
              required
            />
            <Button 
              color='teal' 
              fluid 
              size='large' 
              type='submit'
              className="submit-button"
              animated
            >
              <Button.Content visible>Register</Button.Content>
              <Button.Content hidden>
                <Icon name='user plus' />
              </Button.Content>
            </Button>
          </Form>
          <Message info>
            <Icon name='user circle' />
            <span>Already have an account? </span>
            <a 
              href="#" 
              onClick={switchToLogin}
              className="switch-auth-mode"
            >
              Sign In
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

export default Register;
