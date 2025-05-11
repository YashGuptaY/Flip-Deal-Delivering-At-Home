import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import { useState } from 'react';

const Home = () => {
  const [category, setCategory] = useState('All');
  return (
    <main className='container'>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <ProductDisplay category={category} searchText={''}/>
    </main>
  )
}

export default Home;