package com.prb.demo.service;

import com.prb.demo.io.ProductRequest;
import com.prb.demo.io.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    String uploadFile(MultipartFile file);

    ProductResponse addProduct(ProductRequest request, MultipartFile file);

    List<ProductResponse> readProducts();

    ProductResponse readProduct(String id);

    boolean deleteFile(String filename);

    void deleteProduct(String id);
}
