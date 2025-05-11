import React, { useState } from "react";
import { 
  Container, 
  Form, 
  Grid, 
  Header, 
  Segment, 
  Button, 
  Icon,
  Message,
  Divider 
} from 'semantic-ui-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Container style={{ padding: '4em 0' }}>
      <Grid stackable centered>
        <Grid.Column width={12}>
          <Segment padded='very' raised>
            <Header as='h2' color='teal' textAlign='center'>
              <Icon name='mail outline' />
              <Header.Content>
                Get in Touch
                <Header.Subheader>
                  We'd love to hear from you
                </Header.Subheader>
              </Header.Content>
            </Header>
            
            <Divider section />

            <Grid columns={2} stackable>
              <Grid.Column width={10}>
                <Form size='large' onSubmit={handleSubmit}>
                  <Form.Group widths='equal'>
                    <Form.Input
                      fluid
                      icon='user'
                      iconPosition='left'
                      placeholder='First Name'
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                    <Form.Input
                      fluid
                      icon='user'
                      iconPosition='left'
                      placeholder='Last Name'
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </Form.Group>

                  <Form.Input
                    fluid
                    icon='mail'
                    iconPosition='left'
                    placeholder='Email Address'
                    type='email'
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />

                  <Form.Input
                    fluid
                    icon='phone'
                    iconPosition='left'
                    placeholder='Phone Number'
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />

                  <Form.TextArea
                    placeholder='Your Message'
                    style={{ minHeight: 150 }}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />

                  <Button 
                    color='teal' 
                    size='large' 
                    fluid
                    animated
                  >
                    <Button.Content visible>Send Message</Button.Content>
                    <Button.Content hidden>
                      <Icon name='send' />
                    </Button.Content>
                  </Button>
                </Form>
              </Grid.Column>

              <Grid.Column width={6}>
                <Segment padded='very' color='teal' secondary>
                  <Header as='h3'>Contact Information</Header>
                  <div style={{ marginTop: '2em' }}>
                    <p>
                      <Icon name='map marker alternate' size='large' />
                      <span style={{ marginLeft: '1em' }}>Madhaugarh, UP</span>
                    </p>
                    <p>
                      <Icon name='phone' size='large' />
                      <span style={{ marginLeft: '1em' }}>+91 123 456 7890</span>
                    </p>
                    <p>
                      <Icon name='mail outline' size='large' />
                      <span style={{ marginLeft: '1em' }}>info@producties.com</span>
                    </p>
                    <p>
                      <Icon name='clock outline' size='large' />
                      <span style={{ marginLeft: '1em' }}>Mon - Sat: 9:00 AM - 6:00 PM</span>
                    </p>
                  </div>
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Contact;
