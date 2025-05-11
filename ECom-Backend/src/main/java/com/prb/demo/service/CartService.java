package com.prb.demo.service;

import com.prb.demo.io.CartRequest;
import com.prb.demo.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
