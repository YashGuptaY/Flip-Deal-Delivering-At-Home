import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import {
  Card,
  Image,
  Button,
  Icon,
  Label,
  Rating,
} from 'semantic-ui-react';

const ProductItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);

  return (
    <Card fluid style={{ margin: '0.5em' }}>
      <Image 
        as={Link} 
        to={`/product/${id}`} 
        src={imageUrl} 
        wrapped 
        ui={false} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Content>
        <Card.Header style={{ fontSize: '1rem' }}>{name}</Card.Header>
        <Card.Description style={{ fontSize: '0.9rem' }}>
          {description}
        </Card.Description>
        <div style={{ marginTop: '0.5em' }}>
          <Label tag size='tiny' color='teal'>
            ₹{price}
          </Label>
          <Rating icon='star' defaultRating={4.5} maxRating={5} size='mini' disabled />
        </div>
      </Card.Content>
      <Card.Content extra>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5em' }}>
          <Button as={Link} to={`/product/${id}`} color='blue' basic size='tiny'>
            <Icon name='eye' size='small' /> View
          </Button>
          {quantities[id] > 0 ? (
            <Button.Group size='tiny'>
              <Button icon onClick={() => decreaseQty(id)} color='red'>
                <Icon name='minus' size='small' />
              </Button>
              <Button basic>{quantities[id]}</Button>
              <Button icon onClick={() => increaseQty(id)} color='green'>
                <Icon name='plus' size='small' />
              </Button>
            </Button.Group>
          ) : (
            <Button color='green' size='tiny' onClick={() => increaseQty(id)}>
              <Icon name='plus' size='small' /> Add
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductItem;
