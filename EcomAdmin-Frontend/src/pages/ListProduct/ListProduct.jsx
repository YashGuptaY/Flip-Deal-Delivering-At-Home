import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ListProduct.css";
import { deleteProduct, getProductList } from "../../services/productService";
import AddProductModal from "../../components/AddProductModal/AddProductModal";

const ListProduct = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchList = async () => {
    try {
      const data = await getProductList();
      setList(data);
    } catch (error) {
      toast.error("Error while reading the products.");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const success = await deleteProduct(productId);
      if (success) {
        toast.success("Product removed.");
        await fetchList();
      } else {
        toast.error("Error occurred while removing the product.");
      }
    } catch (error) {
      toast.error("Error occurred while removing the product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="menu-management">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Menu Management</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New Item
        </button>
      </div>

      <div className="d-flex gap-3 mb-4">
        <div className="flex-grow-1">
          <input
            type="text"
            className="form-control"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Mithai</option>
            <option>Thali</option>
            <option>Paratha</option>
            <option>Paneer</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>STATUS</th>
              <th>FEATURED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.imageUrl} alt="" className="menu-item-image" />
                </td>
                <td>
                  <div>{item.name}</div>
                  <small className="text-muted">{item.description}</small>
                </td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>
                  <span className="badge bg-success">Available</span>
                </td>
                <td>Regular</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeProduct(item.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-warning">
                      <i className="bi bi-star"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddProductModal 
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={fetchList}
      />
    </div>
  );
};

export default ListProduct;
