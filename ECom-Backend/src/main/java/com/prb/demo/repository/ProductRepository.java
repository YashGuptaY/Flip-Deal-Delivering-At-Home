package com.prb.demo.repository;

import com.prb.demo.entity.ProductEntity;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<ProductEntity, String> {
	
    @Query("{ '$or': [ " +
            "  { 'name': { $regex: ?0, $options: 'i' } }, " +
            "  { 'description': { $regex: ?0, $options: 'i' } }, " +
            "  { 'category': { $regex: ?0, $options: 'i' } } " +
            "] }")
     List<ProductEntity> searchByKeyword(String keyword);
    
    List<ProductEntity> findByCategoryIgnoreCase(String category);

}
