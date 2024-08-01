package com.ShopNook.ecommerce.service;

import com.ShopNook.ecommerce.dao.CustomerRepository;
import com.ShopNook.ecommerce.dto.Purchase;
import com.ShopNook.ecommerce.dto.PurchaseResult;
import com.ShopNook.ecommerce.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImplementation implements  CheckoutService
{
    private CustomerRepository customerRepository;

    public CheckoutServiceImplementation(CustomerRepository customerRepository)
    {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResult submitOrder(Purchase purchase)
    {
        // get the order info from the dto
        Order order = purchase.getOrder();

        // generate tracking reference
        String orderTrackingReference = generateOrderTrackingReference();
        order.setOrderTrackingReference(orderTrackingReference);

        // populating the order with orderItems
        Set<OrderItem> orderItemSet = purchase.getOrderItemSet();
        if (orderItemSet != null) {
            orderItemSet.forEach(order::add);
        }
        // populating order with the Address of delivery and payment
        order.setPaymentAddress(purchase.getPaymentAddress());
        order.setDeliveryAddress(purchase.getDeliveryAddress());

        // populating the customer with the order
        Customer customer = purchase.getCustomer();

        // check if this customer already made a purchase
        String c_email = customer.getEmail();

        Customer customerAlreadyInTheDb = customerRepository.findByEmail(c_email);

        if(customerAlreadyInTheDb != null)
        {
            // we found our customer
            customer = customerAlreadyInTheDb;
        }
        customer.add(order);

        // saving into the DB
        customerRepository.save(customer);

        // return a response
        return new PurchaseResult(orderTrackingReference);
    }

    private String generateOrderTrackingReference()
    {
        // create a UUId Number (version 4.0)
        return UUID.randomUUID().toString();
    }
}
