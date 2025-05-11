import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../service/productService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { 
  Container, 
  Grid, 
  Image, 
  Header, 
  Segment, 
  Label, 
  Button, 
  Icon,
  Rating,
  Divider 
} from 'semantic-ui-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { increaseQty } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const productData = await fetchProductDetails(id);
        setData(productData);
      } catch (error) {
        toast.error("Error displaying the product details.");
      }
    };
    loadProductDetails();
  }, [id]);

  const addToCart = () => {
    increaseQty(data.id);
    navigate("/cart");
  };

  return (
    <Container style={{ padding: '2em 0' }}>
      <Grid columns={2} stackable>
        <Grid.Column>
          <Segment>
            <Image 
              src={data.imageUrl} 
              fluid 
              rounded
              style={{ 
                maxHeight: '500px', 
                width: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment padded='very'>
            <Label ribbon color='teal' size='large'>
              {data.category}
            </Label>
            <Header as='h1' style={{ marginTop: '0.5em' }}>
              {data.name}
              <Label 
                tag 
                size='huge' 
                color='orange' 
                style={{ marginLeft: '1em' }}
              >
                ₹{data.price}
              </Label>
            </Header>
            
            <Divider />
            
            <div style={{ marginBottom: '2em' }}>
              <Rating 
                icon='star' 
                defaultRating={4.5} 
                maxRating={5} 
                disabled 
                size='huge'
              />
              <Label basic>4.5/5</Label>
            </div>

            <Header as='h3'>Description</Header>
            <p style={{ 
              fontSize: '1.2em', 
              lineHeight: '1.6', 
              color: 'rgba(0,0,0,0.7)' 
            }}>
              {data.description}
            </p>

            <Divider />

            <Button.Group size='large'>
              <Button 
                positive 
                icon 
                labelPosition='left' 
                onClick={addToCart}
              >
                <Icon name='cart' />
                Add to Cart
              </Button>
              <Button.Or />
              <Button 
                primary 
                icon 
                labelPosition='right' 
                onClick={() => navigate('/cart')}
              >
                Go to Cart
                <Icon name='right arrow' />
              </Button>
            </Button.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
