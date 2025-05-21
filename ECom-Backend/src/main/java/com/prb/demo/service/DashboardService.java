package com.prb.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prb.demo.entity.OrderEntity;
import com.prb.demo.repository.OrderRepository;
import com.prb.demo.repository.ProductRepository;
import com.prb.demo.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DashboardService {

	private final UserRepository userRepository;
	
	private final OrderRepository orderRepository;
	
	private final ProductRepository productRepository;
	
	public long getUserCount() {
	    return userRepository.count();
	}
	
	public long getOrderCount() {
		return orderRepository.count();
	}
	
	public long getProductCount() {
		return productRepository.count();
	}
	
	
	public double getTotalRevenue() {
	    List<OrderEntity> paidOrders = orderRepository.findByPaymentStatusIgnoreCase("paid");
	    return paidOrders.stream()
	            .mapToDouble(OrderEntity::getAmount)
	            .sum();
	}


}
