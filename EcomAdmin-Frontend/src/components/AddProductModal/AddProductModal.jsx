import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { addProduct } from '../../services/productService';
import { toast } from 'react-toastify';
import './AddProductModal.css';

const AddProductModal = ({ show, onHide, onSuccess }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Stationary'
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please select an image.');
            return;
        }
        try {
            await addProduct(data, image);
            toast.success('Product added successfully.');
            setData({ name: '', description: '', category: 'Stationary', price: '' });
            setImage(null);
            onSuccess();
            onHide();
        } catch (error) {
            toast.error('Error adding product.');
        }
    };

    return (
        <>
            <div className={`modal fade ${show ? 'show' : ''}`} 
                 style={{ display: show ? 'block' : 'none' }} 
                 tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0 bg-lavender text-white">
                            <h5 className="modal-title fs-4">Add New Product</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
                        </div>
                        <div className="modal-body p-4">
                            <form onSubmit={onSubmitHandler}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="upload-box mb-3">
                                            <label htmlFor="image" className="form-label d-block text-center">
                                                <img src={image ? URL.createObjectURL(image) : assets.upload} 
                                                     alt="" 
                                                     className="img-fluid upload-preview" />
                                                <span className="d-block mt-2 text-muted">Click to upload image</span>
                                            </label>
                                            <input type="file" className="form-control" id="image" hidden 
                                                   onChange={(e) => setImage(e.target.files[0])} />
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Product Name</label>
                                            <input type="text" className="form-control" id="name" required 
                                                   name='name' onChange={onChangeHandler} value={data.name}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea className="form-control" id="description" rows="3" required 
                                                     name='description' onChange={onChangeHandler} value={data.description}></textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="category" className="form-label">Category</label>
                                                    <select name="category" id="category" className='form-select' 
                                                            onChange={onChangeHandler} value={data.category}>
                                                        <option value="Stationary">Stationary</option>
                                                        <option value="Medicines">Medicines</option>
                                                        <option value="Bedsheet">Bedsheets</option>
                                                        <option value="General Items">General Items</option>
                                                        <option value="Mobile Accessories">Mobile Accessories</option>
                                                        <option value="Beauty Products">Beauty Products</option>
                                                        <option value="Kitchen Items">Kitchen Items</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="price" className="form-label">Price</label>
                                                    <input type="number" name="price" id="price" className='form-control' 
                                                           onChange={onChangeHandler} value={data.price} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end mt-4">
                                    <button type="button" className="btn btn-outline-secondary me-2" onClick={onHide}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default AddProductModal;
