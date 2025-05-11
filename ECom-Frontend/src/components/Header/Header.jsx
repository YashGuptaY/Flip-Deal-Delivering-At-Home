import React from "react";
import { Link } from "react-router-dom";
import { Container, Header as SemanticHeader, Button, Segment, Icon } from 'semantic-ui-react';
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <Segment
      textAlign='center'
      style={{ 
        minHeight: 500, 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${assets.header})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '4em 0em',
        marginTop: '1em',
        borderRadius: '10px'
      }}
      vertical
    >
      <Container text>
        <SemanticHeader
          as='h1'
          content='Order your favorite product here'
          inverted
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '2em',
          }}
        />
        <SemanticHeader
          as='h2'
          content='Discover the best products in Madhaugarh'
          inverted
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
          }}
        />
        <Button as={Link} to='/explore' primary size='huge'>
          Explore Now
          <Icon name='right arrow' />
        </Button>
      </Container>
    </Segment>
  );
};

export default Header;
