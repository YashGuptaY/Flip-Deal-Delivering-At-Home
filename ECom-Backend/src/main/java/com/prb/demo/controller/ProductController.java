package com.prb.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prb.demo.io.ProductRequest;
import com.prb.demo.io.ProductResponse;
import com.prb.demo.io.ProductUpdateReq;
import com.prb.demo.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductResponse addProduct(@RequestPart("product") String productString,
                                @RequestPart("file")MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        ProductRequest request = null;
        try {
            request = objectMapper.readValue(productString, ProductRequest.class);
        }catch(JsonProcessingException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format");
        }
        ProductResponse response = productService.addProduct(request, file);
        return response;
    }

    @GetMapping
    public List<ProductResponse> readProducts() {
        return productService.readProducts();
    }

    @GetMapping("/{id}")
    public ProductResponse readProduct(@PathVariable String id) {
        return productService.readProduct(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchProducts(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }
    
    @GetMapping("/category")
    public List<ProductResponse> getProductsByCategory(@RequestParam String category) {
        return productService.getProductsByCategory(category);
    }

    @PatchMapping("/{id}/availability")
    public ResponseEntity<ProductResponse> updateAvailability(
            @PathVariable String id,
            @RequestBody Boolean isAvailable) {
        return ResponseEntity.ok(productService.updateProductAvailability(id, isAvailable));
    }
    
    @PatchMapping("/{id}/update")
    public ResponseEntity<ProductUpdateReq> updateProduct(
            @PathVariable String id,
            @RequestBody ProductUpdateReq productUpdateReq) {
        return ResponseEntity.ok(productService.updateProduct(id,productUpdateReq));
    }
    
    @GetMapping("/search/category")
    public ResponseEntity<List<ProductResponse>> searchProductsByCategory(
            @RequestParam String keyword,
            @RequestParam String category) {
        return ResponseEntity.ok(productService.searchProductsByCategory(keyword, category));
    }


}
