import React from 'react';

const ViewProductModal = ({ show, onHide, product }) => {
    if (!product) return null;

    return (
        <>
            <div className={`modal fade ${show ? 'show' : ''}`} 
                 style={{ display: show ? 'block' : 'none' }} 
                 tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Product Details</h5>
                            <button type="button" className="btn-close" onClick={onHide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center mb-3">
                                <img src={product.imageUrl} 
                                     alt={product.name} 
                                     style={{ maxHeight: '200px', objectFit: 'contain' }}/>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold">Name</h6>
                                <p>{product.name}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold">Description</h6>
                                <p>{product.description}</p>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="fw-bold">Price</h6>
                                    <p>₹{product.price}</p>
                                </div>
                                <div className="col-6">
                                    <h6 className="fw-bold">Category</h6>
                                    <p>{product.category}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold">Status</h6>
                                <span className={`badge ${product.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                                    {product.isAvailable ? 'Available' : 'Not Available'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default ViewProductModal;
