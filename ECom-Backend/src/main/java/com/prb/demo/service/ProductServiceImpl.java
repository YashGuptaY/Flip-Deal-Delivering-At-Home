package com.prb.demo.service;

import com.prb.demo.entity.ProductEntity;
import com.prb.demo.io.ProductRequest;
import com.prb.demo.io.ProductResponse;
import com.prb.demo.io.ProductUpdateReq;
import com.prb.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private S3Client s3Client;
    @Autowired
    private ProductRepository productRepository;

    @Value("${aws.s3.bucketname}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file) {
        String filenameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String key = UUID.randomUUID().toString()+"."+filenameExtension;
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();
            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            if (response.sdkHttpResponse().isSuccessful()) {
                return "https://"+bucketName+".s3.amazonaws.com/"+key;
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
            }
        }catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occured while uploading the file");
        }
    }

    @Override
    public ProductResponse addProduct(ProductRequest request, MultipartFile file) {
        ProductEntity newProductEntity = convertToEntity(request);
        String imageUrl = uploadFile(file);
        newProductEntity.setImageUrl(imageUrl);
        newProductEntity = productRepository.save(newProductEntity);
        return convertToResponse(newProductEntity);
    }

    @Override
    public List<ProductResponse> readProducts() {
        List<ProductEntity> databaseEntries = productRepository.findAll();
        return databaseEntries.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public ProductResponse readProduct(String id) {
        ProductEntity existingProduct = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found for the id:"+id));
        return convertToResponse(existingProduct);
    }

    @Override
    public boolean deleteFile(String filename) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void deleteProduct(String id) {
        ProductResponse response = readProduct(id);
        String imageUrl = response.getImageUrl();
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        boolean isFileDelete = deleteFile(filename);
        if (isFileDelete) {
            productRepository.deleteById(response.getId());
        }
    }
    
    @Override
    public List<ProductResponse> searchProducts(String keyword) {
        List<ProductEntity> matchedProducts = productRepository.searchByKeyword(keyword);
        return matchedProducts.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ProductResponse> getProductsByCategory(String category) {
        List<ProductEntity> entities = productRepository.findByCategoryIgnoreCase(category);
        System.out.println("Filtering category: " + category);
        productRepository.findByCategoryIgnoreCase(category)
                .forEach(p -> System.out.println("Matched Product Category: " + p.getCategory()));

        return entities.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public ProductResponse updateProductAvailability(String id, Boolean isAvailable) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        product.setIsAvailable(isAvailable);
        productRepository.save(product);
        return convertToResponse(product);
    }
    
    @Override
    public ProductUpdateReq updateProduct(String id, ProductUpdateReq productUpdateReq) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.setName(productUpdateReq.getName());
        product.setDescription(productUpdateReq.getDescription());
        product.setPrice(productUpdateReq.getPrice());
        productRepository.save(product);
        return convertToUpdateResponse(product);
    }
    
    @Override
    public List<ProductResponse> searchProductsByCategory(String keyword, String category) {
        List<ProductEntity> matched = productRepository.searchByKeywordAndCategory(keyword, category);
        return matched.stream()
                      .map(this::convertToResponse)
                      .collect(Collectors.toList());
    }

    
    private ProductUpdateReq convertToUpdateResponse(ProductEntity productEntity) {
        return ProductUpdateReq.builder()
                .id(productEntity.getId())
                .name(productEntity.getName())
                .description(productEntity.getDescription())
                .price(productEntity.getPrice())
                .build();
    }


    private ProductEntity convertToEntity(ProductRequest request) {
        return ProductEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .isAvailable(true)
                .category(request.getCategory())
                .price(request.getPrice())
                .build();

    }

    private ProductResponse convertToResponse(ProductEntity entity) {
        return ProductResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .isAvailable(entity.getIsAvailable())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
    

}
