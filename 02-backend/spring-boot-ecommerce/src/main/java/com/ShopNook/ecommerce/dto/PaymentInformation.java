package com.ShopNook.ecommerce.dto;

import lombok.Data;

@Data
public class PaymentInformation
{
    private int billAmount;
    private String currency;
    // private String billingEmail;
}
