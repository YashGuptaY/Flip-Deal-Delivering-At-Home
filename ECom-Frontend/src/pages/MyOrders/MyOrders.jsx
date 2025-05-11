import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { fetchUserOrders } from "../../service/orderService";
import { Container, Table, Icon, Button, Label } from 'semantic-ui-react';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await fetchUserOrders(token);
    setData(response);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <Container style={{ marginTop: '2em' }}>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Items</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((order, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Label ribbon color={order.orderStatus === 'Preparing' ? 'yellow' : 'green'}>
                  {order.orderStatus}
                </Label>
              </Table.Cell>
              <Table.Cell>
                {order.orderedItems.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.orderedItems.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </Table.Cell>
              <Table.Cell>₹{order.amount.toFixed(2)}</Table.Cell>
              <Table.Cell>{order.orderedItems.length} items</Table.Cell>
              <Table.Cell>
                <Button icon circular size='small' color='blue' onClick={fetchOrders}>
                  <Icon name='refresh' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default MyOrders;
