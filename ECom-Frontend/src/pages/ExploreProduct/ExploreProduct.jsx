import React, { useState } from 'react';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import { Container, Input, Select, Form } from 'semantic-ui-react';

const categoryOptions = [
  { key: 'all', text: 'All', value: 'All' },
  { key: 'stationary', text: 'Stationary', value: 'Stationary' },
  { key: 'medicines', text: 'Medicines', value: 'Medicines' },
  { key: 'bedsheet', text: 'Bedsheets', value: 'Bedsheet' },
  { key: 'general', text: 'General Items', value: 'General Items' },
  { key: 'mobile', text: 'Mobile Accessories', value: 'Mobile Accessories' },
  { key: 'beauty', text: 'Beauty Products', value: 'Beauty Products' },
  { key: 'kitchen', text: 'Kitchen Items', value: 'Kitchen Items' },
];

const ExploreProduct = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <Container>
      <Form style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Form.Group widths='equal'>
          <Form.Field>
            <Select
              placeholder='Select Category'
              options={categoryOptions}
              value={category}
              onChange={(e, { value }) => setCategory(value)}
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon='search'
              placeholder='Search products...'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              fluid
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <ProductDisplay category={category} searchText={searchText} />
    </Container>
  );
};

export default ExploreProduct;