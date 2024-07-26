package com.ShopNook.ecommerce.service;

import com.ShopNook.ecommerce.dto.Purchase;
import com.ShopNook.ecommerce.dto.PurchaseResult;

public interface CheckoutService
{
    PurchaseResult submitOrder(Purchase purchase);

}
