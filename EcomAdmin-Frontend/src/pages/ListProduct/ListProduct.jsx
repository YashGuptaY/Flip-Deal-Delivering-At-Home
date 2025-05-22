import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ListProduct.css";
import { deleteProduct, getProductList, updateAvailability, searchProducts, getProductsByCategory, searchProductsByCategory } from "../../services/productService";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import UpdateProductModal from "../../components/UpdateProductModal/UpdateProductModal";
import ViewProductModal from "../../components/ViewProductModal/ViewProductModal";

const ListProduct = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const toggleAvailability = async (productId, currentAvailability) => {
    try {
      await updateAvailability(productId, !currentAvailability);
      toast.success("Availability updated successfully");
      await fetchList();
    } catch (error) {
      toast.error("Error updating availability");
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    try {
      if (value.trim()) {
        if (category !== "All") {
          // Search within selected category
          const data = await searchProductsByCategory(value, category);
          setList(data);
        } else {
          // Search across all categories
          const data = await searchProducts(value);
          setList(data);
        }
      } else {
        if (category !== "All") {
          // Show category products when search is cleared
          const data = await getProductsByCategory(category);
          setList(data);
        } else {
          // Show all products
          await fetchList();
        }
      }
    } catch (error) {
      toast.error("Error searching products");
    }
  };

  const handleCategoryChange = async (selectedCategory) => {
    setCategory(selectedCategory);
    try {
      if (selectedCategory === "All") {
        if (searchTerm.trim()) {
          // Keep search results across all categories
          const data = await searchProducts(searchTerm);
          setList(data);
        } else {
          // Show all products
          await fetchList();
        }
      } else {
        if (searchTerm.trim()) {
          // Search within new category
          const data = await searchProductsByCategory(searchTerm, selectedCategory);
          setList(data);
        } else {
          // Show category products
          const data = await getProductsByCategory(selectedCategory);
          setList(data);
        }
      }
    } catch (error) {
      toast.error("Error filtering by category");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="menu-management">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product Management</h2>
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
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div>
          <select
            className="form-select"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categoryOptions.map(option => (
              <option key={option.key} value={option.value}>
                {option.text}
              </option>
            ))}
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
                  <span className={`badge ${item.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                    {item.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleUpdateClick(item)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeProduct(item.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleViewClick(item)}>
                      <i className="bi bi-eye"></i>
                    </button>
                    <button 
                      className={`btn btn-sm ${item.isAvailable ? 'btn-outline-warning' : 'btn-warning'}`}
                      onClick={() => toggleAvailability(item.id, item.isAvailable)}
                    >
                      <i className="bi bi-star-fill"></i>
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
      <UpdateProductModal 
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        product={selectedProduct}
        onSuccess={fetchList}
      />
      <ViewProductModal 
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default ListProduct;
