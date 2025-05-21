package com.prb.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prb.demo.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/countuser")
    public ResponseEntity<Long> getUserCount() {
        long count = dashboardService.getUserCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/countorder")
    public ResponseEntity<Long> getOrderCount() {
        long count = dashboardService.getOrderCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/countproduct")
    public ResponseEntity<Long> getProductCount() {
        long count = dashboardService.getProductCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/revenue")
    public ResponseEntity<Double> getTotalRevenue() {
        double totalRevenue = dashboardService.getTotalRevenue();
        return ResponseEntity.ok(totalRevenue);
    }

}
