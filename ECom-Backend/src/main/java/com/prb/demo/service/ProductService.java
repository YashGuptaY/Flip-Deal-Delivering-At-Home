package com.prb.demo.service;

import com.prb.demo.io.ProductRequest;
import com.prb.demo.io.ProductResponse;
import com.prb.demo.io.ProductUpdateReq;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    String uploadFile(MultipartFile file);

    ProductResponse addProduct(ProductRequest request, MultipartFile file);

    List<ProductResponse> readProducts();

    ProductResponse readProduct(String id);

    boolean deleteFile(String filename);

    void deleteProduct(String id);
    
    List<ProductResponse> searchProducts(String keyword);
    
    List<ProductResponse> getProductsByCategory(String category);
    
    ProductResponse updateProductAvailability(String id, Boolean isAvailable);
    
    ProductUpdateReq updateProduct(String id, ProductUpdateReq productUpdateReq);

}
