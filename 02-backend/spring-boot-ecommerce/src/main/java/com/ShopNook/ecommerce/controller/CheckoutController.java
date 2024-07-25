package com.ShopNook.ecommerce.controller;

import com.ShopNook.ecommerce.dto.Purchase;
import com.ShopNook.ecommerce.dto.PurchaseResult;
import com.ShopNook.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController
{
    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService)
    {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResult submitOrder(@RequestBody Purchase purchase)
    {
        return checkoutService.submitOrder(purchase);
    }

}
