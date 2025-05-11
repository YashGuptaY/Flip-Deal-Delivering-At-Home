import React, { useContext, useState } from "react";
import { Container, Form, Grid, Header, Segment, List, Button } from 'semantic-ui-react';
import "./PlaceOrder.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from "../../util/contants";
import { useNavigate } from "react-router-dom";
import {
  createOrder,
  deleteOrder,
  verifyPayment,
} from "../../service/orderService";
import { clearCartItems } from "../../service/cartService";

const PlaceOrder = () => {
  const { productList, quantities, setQuantities, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        productId: item.productId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: total.toFixed(2),
      orderStatus: "Preparing",
    };

    try {
      const response = await createOrder(orderData, token);
      if (response.razorpayOrderId) {
        // initiate the payment
        initiateRazorpayPayment(response);
      } else {
        toast.error("Unable to place order. Please try again.");
      }
    } catch (error) {
      toast.error("Unable to place order. Please try again.");
    }
  };

  const initiateRazorpayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount, //Convert to paise
      currency: "INR",
      name: "Product Land",
      description: "Product order payment",
      order_id: order.razorpayOrderId,
      handler: verifyPaymentHandler,
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: deleteOrderHandler,
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPaymentHandler = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
    };
    try {
      const success = await verifyPayment(paymentData, token);
      if (success) {
        toast.success("Payment successful.");
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment failed. Please try again.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId, token);
    } catch (error) {
      toast.error("Something went wrong. Contact support.");
    }
  };

  const clearCart = async () => {
    try {
      await clearCartItems(token, setQuantities);
    } catch (error) {
      toast.error("Error while clearing the cart.");
    }
  };

  //cart items
  const cartItems = productList.filter((product) => quantities[product.id] > 0);

  //calcualtiong
  const { subtotal, shipping, tax, total } = calculateCartTotals(
    cartItems,
    quantities
  );

  return (
    <Container style={{ marginTop: '2em' }}>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={10}>
            <Header as='h2'>Billing Details</Header>
            <Form onSubmit={onSubmitHandler}>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='First name'
                  placeholder='First name'
                  name='firstName'
                  value={data.firstName}
                  onChange={onChangeHandler}
                  required
                />
                <Form.Input
                  fluid
                  label='Last name'
                  placeholder='Last name'
                  name='lastName'
                  value={data.lastName}
                  onChange={onChangeHandler}
                  required
                />
              </Form.Group>
              <Form.Input
                label='Email'
                placeholder='Email'
                type='email'
                name='email'
                value={data.email}
                onChange={onChangeHandler}
                required
              />
              <Form.Input
                label='Phone Number'
                placeholder='Phone Number'
                type='tel'
                name='phoneNumber'
                value={data.phoneNumber}
                onChange={onChangeHandler}
                required
              />
              <Form.Input
                label='Address'
                placeholder='Address'
                name='address'
                value={data.address}
                onChange={onChangeHandler}
                required
              />
              <Form.Group widths='equal'>
                <Form.Select
                  fluid
                  label='State'
                  options={[
                    { key: 'up', text: 'Uttar Pradesh', value: 'Uttar Pradesh' }
                  ]}
                  placeholder='State'
                  name='state'
                  value={data.state}
                  onChange={(e, { value }) => setData({ ...data, state: value })}
                  required
                />
                <Form.Select
                  fluid
                  label='City'
                  options={[
                    { key: 'orai', text: 'Orai', value: 'Orai' }
                  ]}
                  placeholder='City'
                  name='city'
                  value={data.city}
                  onChange={(e, { value }) => setData({ ...data, city: value })}
                  required
                />
                <Form.Input
                  fluid
                  label='ZIP Code'
                  placeholder='ZIP Code'
                  name='zip'
                  value={data.zip}
                  onChange={onChangeHandler}
                  required
                />
              </Form.Group>
              <Button 
                type='submit'
                color='green'
                size='large'
                disabled={cartItems.length === 0}
              >
                Place Order
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Header as='h3'>Order Summary</Header>
              <List divided relaxed>
                {cartItems.map((item) => (
                  <List.Item key={item.id}>
                    <List.Content floated='right'>
                      ₹{(item.price * quantities[item.id]).toFixed(2)}
                    </List.Content>
                    <List.Content>
                      <List.Header>{item.name}</List.Header>
                      <List.Description>Quantity: {quantities[item.id]}</List.Description>
                    </List.Content>
                  </List.Item>
                ))}
                <List.Item>
                  <List.Content floated='right'>
                    ₹{shipping.toFixed(2)}
                  </List.Content>
                  <List.Content>Shipping</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated='right'>
                    ₹{tax.toFixed(2)}
                  </List.Content>
                  <List.Content>Tax (10%)</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated='right'>
                    <strong>₹{total.toFixed(2)}</strong>
                  </List.Content>
                  <List.Content><strong>Total</strong></List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default PlaceOrder;
