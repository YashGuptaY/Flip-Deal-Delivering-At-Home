import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { calculateCartTotals } from "../../util/cartUtils";
import { 
  Container, 
  Segment, 
  Header, 
  Button, 
  Icon, 
  Item, 
  Label,
  Grid,
  Statistic
} from 'semantic-ui-react';

const Cart = () => {
  const navigate = useNavigate();
  const { productList, increaseQty, decreaseQty, quantities, removeFromCart } = useContext(StoreContext);
  const cartItems = productList.filter((product) => quantities[product.id] > 0);
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as='h1'>Shopping Cart</Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={11}>
            {cartItems.length === 0 ? (
              <Segment placeholder>
                <Header icon>
                  <Icon name='shopping cart' />
                  Your cart is empty
                </Header>
                <Button primary as={Link} to="/">Continue Shopping</Button>
              </Segment>
            ) : (
              <Segment>
                <Item.Group divided>
                  {cartItems.map((product) => (
                    <Item key={product.id}>
                      <Item.Image size='small' src={product.imageUrl} />
                      <Item.Content>
                        <Item.Header>{product.name}</Item.Header>
                        <Item.Meta>Category: {product.category}</Item.Meta>
                        <Item.Description>
                          <Label tag size='large'>₹{product.price}</Label>
                        </Item.Description>
                        <Item.Extra>
                          <Button.Group>
                            <Button icon negative onClick={() => decreaseQty(product.id)}>
                              <Icon name='minus' />
                            </Button>
                            <Button basic>{quantities[product.id]}</Button>
                            <Button icon positive onClick={() => increaseQty(product.id)}>
                              <Icon name='plus' />
                            </Button>
                          </Button.Group>
                          <Button negative floated='right' onClick={() => removeFromCart(product.id)}>
                            <Icon name='trash' /> Remove
                          </Button>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  ))}
                </Item.Group>
              </Segment>
            )}
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <Header as='h3'>Order Summary</Header>
              <Statistic.Group size='mini' widths='two'>
                <Statistic>
                  <Statistic.Label>Subtotal</Statistic.Label>
                  <Statistic.Value>₹{subtotal.toFixed(2)}</Statistic.Value>
                </Statistic>
                <Statistic>
                  <Statistic.Label>Shipping</Statistic.Label>
                  <Statistic.Value>₹{shipping.toFixed(2)}</Statistic.Value>
                </Statistic>
                <Statistic>
                  <Statistic.Label>Tax</Statistic.Label>
                  <Statistic.Value>₹{tax.toFixed(2)}</Statistic.Value>
                </Statistic>
                <Statistic>
                  <Statistic.Label>Total</Statistic.Label>
                  <Statistic.Value>₹{total.toFixed(2)}</Statistic.Value>
                </Statistic>
              </Statistic.Group>
              <Button 
                fluid 
                positive 
                size='large' 
                disabled={cartItems.length === 0}
                onClick={() => navigate("/order")}
                style={{ marginTop: '1em' }}
              >
                <Icon name='check' /> Proceed to Checkout
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Cart;
