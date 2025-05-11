import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ListProduct.css";
import { deleteProduct, getProductList } from "../../services/productService";

const ListProduct = () => {
  const [list, setList] = useState([]);
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
        toast.error("Error occred while removing the product.");
      }
    } catch (error) {
      toast.error("Error occred while removing the product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={item.imageUrl} alt="" height={48} width={48} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>&#8377;{item.price}.00</td>
                  <td className="text-danger">
                    <i
                      class="bi bi-trash-fill fs-4"
                      onClick={() => removeProduct(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
