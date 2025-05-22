import React, { useEffect, useState } from 'react';
import { getUserById } from '../../services/userService';

const UserViewModal = ({ show, onHide, user }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (user && show) {
            getUserById(user.id).then(data => {
                setUserDetails(data);
            });
        }
    }, [user, show]);

    if (!show || !userDetails) return null;

    return (
        <>
            <div className={`modal fade ${show ? 'show' : ''}`} 
                 style={{ display: show ? 'block' : 'none' }} 
                 tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">User Details</h5>
                            <button type="button" className="btn-close" onClick={onHide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <h6 className="fw-bold">Name</h6>
                                <p>{userDetails.name}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold">Email</h6>
                                <p>{userDetails.email}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold">Phone</h6>
                                <p>{userDetails.phone}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold">Address</h6>
                                <p>{userDetails.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default UserViewModal;
