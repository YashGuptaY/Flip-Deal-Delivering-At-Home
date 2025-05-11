import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Container, Image, Button, Icon, Label, Dropdown } from 'semantic-ui-react';
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Menubar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);
  const navigate = useNavigate();
  const cartCount = Object.values(quantities).filter(qty => qty > 0).length;

  const handleItemClick = (e, { name }) => setActiveItem(name);
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as={Link} to='/' header>
          <Image size='mini' src={assets.logo} style={{ marginRight: '1.5em' }} />
          Flipdeal
        </Menu.Item>

        <Menu.Item
          as={Link}
          to='/'
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={Link}
          to='/explore'
          name='explore'
          active={activeItem === 'explore'}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={Link}
          to='/contact'
          name='contact'
          active={activeItem === 'contact'}
          onClick={handleItemClick}
        />

        <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/cart'>
            <Icon name='shop' />
            Cart
            {cartCount > 0 && (
              <Label color='red' floating circular>
                {cartCount}
              </Label>
            )}
          </Menu.Item>

          {!token ? (
            <>
              <Menu.Item>
                <Button as={Link} to='/login' primary>Login</Button>
              </Menu.Item>
              <Menu.Item>
                <Button as={Link} to='/register' positive>Register</Button>
              </Menu.Item>
            </>
          ) : (
            <Dropdown item icon='user' simple>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/myorders'>
                  <Icon name='list' />
                  My Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>
                  <Icon name='sign out' />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Menubar;
