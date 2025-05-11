import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';
import { Container, Grid } from 'semantic-ui-react';

const ProductDisplay = ({category, searchText}) => {
    const {productList} = useContext(StoreContext);
    const filteredProducts = productList.filter(product => (
        (category === 'All' || product.category === category) &&
        product.name.toLowerCase().includes(searchText.toLowerCase())
    ));

    return (
        <Container fluid>
            <Grid columns={5}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <Grid.Column key={index}>
                            <ProductItem 
                                name={product.name} 
                                description={product.description}
                                id={product.id}
                                imageUrl={product.imageUrl}
                                price={product.price} 
                            />
                        </Grid.Column>
                    ))
                ) : (
                    <Grid.Column width={16} textAlign='center'>
                        <h4>No product found.</h4>
                    </Grid.Column>
                )}
            </Grid>
        </Container>
    );
}

export default ProductDisplay;