import React, { useRef } from "react";
import { categories } from "../../assets/assets";
import { Container, Grid, Image, Header, Segment, Icon } from 'semantic-ui-react';

const ExploreMenu = ({ category, setCategory }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Container fluid>
      <Segment basic>
        <Header as='h1' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Explore Our Wide Range of Products
          <div>
            <Icon 
              name='angle left' 
              size='medium'
              style={{ cursor: 'pointer', color: 'black' }} 
              onClick={() => scroll('left')}
            />
            <Icon 
              name='angle right' 
              size='medium'
              style={{ cursor: 'pointer', color: 'black' }} 
              onClick={() => scroll('right')}
            />
          </div>
        </Header>
        <p>Explore curated lists of products from top categories</p>
        
        <div 
          ref={sliderRef} 
          style={{
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          <Grid columns={6} style={{ flexWrap: 'nowrap', margin: 0, minWidth: 'max-content' }}>
            {categories.map((item, index) => (
              <Grid.Column key={index} style={{ padding: '0 10px' }}>
                <Segment 
                  textAlign='center' 
                  basic 
                  className="category-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCategory(prev => prev === item.category ? 'All' : item.category)}
                >
                  <Image 
                    src={item.icon} 
                    size='small' 
                    circular 
                    centered
                    style={{
                      border: item.category === category ? '4px solid #f2711c' : 'none',
                      padding: '2px',
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover'
                    }}
                  />
                  <Header 
                    as='h4' 
                    style={{ 
                      marginTop: '0.5em',
                      color: item.category === category ? '#f2711c' : 'inherit'
                    }}
                  >
                    {item.category}
                  </Header>
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      </Segment>
    </Container>
  );
};

export default ExploreMenu;
