import React, { useState } from 'react';
import {assets} from '../../assets/assets';
import axios from 'axios';
import { addProduct } from '../../services/productService';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:'',
        description: '',
        price:'',
        category: 'Stationary'
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please select an image.');
            return;
        }
        try {
            await addProduct(data, image);
            toast.success('Product added successfully.');
            setData({name: '', description: '', category: 'Stationary', price: ''});
            setImage(null);
        } catch (error) {
            toast.error('Error adding product.');
        }
    }
  return (
    <div className="mx-2 mt-2">
  <div className="row">
    <div className="card col-md-4">
      <div className="card-body">
        <h2 className="mb-4">Add Product</h2>
        <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
            <label htmlFor="image" className="form-label">
                <img src={image ? URL.createObjectURL(image): assets.upload} alt="" width={98} />
            </label>
            <input type="file" className="form-control" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" placeholder='Pen,Lipstick and many more' className="form-control" id="name" required name='name' onChange={onChangeHandler} value={data.name}/>
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" placeholder='Write content here...' id="description" rows="5" required name='description' onChange={onChangeHandler} value={data.description}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select name="category" id="category" className='form-control' onChange={onChangeHandler} value={data.category}>
                <option value="Stationary">Stationary</option>
                <option value="Medicines">Medicines</option>
                <option value="Bedsheet">Bedsheets</option>
                <option value="General Items">General Items</option>
                <option value="Mobile Accessories">Mobile Accessories</option>
                <option value="Beauty Products">Beauty Products</option>
                <option value="Kitchen Items">Kitchen Items</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" name="price" id="price" placeholder='&#8377;200' className='form-control' onChange={onChangeHandler} value={data.price} />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddProduct;